// simple wrapper around fetch for calling the backend REST API

// helper that constructs the base URL from environment variables
function getBaseUrl(): string {
  // Vite exposes environment variables prefixed with VITE_ via import.meta.env
  // if the variable is missing we fall back to localhost (development)
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
  if (envUrl) {
    return envUrl.replace(/\/+$/, '') // strip trailing slash
  }

  // default for local development
  return 'http://localhost:8080'
}

interface RegisterPayload {
  nome: string
  email: string
  crmv: string
  senha: string
}

interface LoginPayload {
  email: string
  senha: string
}

const TOKEN_KEY = 'auth_token'

export function setToken(token: string) {
  try { localStorage.setItem(TOKEN_KEY, token) } catch {}
}

export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
}

export function removeToken() {
  try { localStorage.removeItem(TOKEN_KEY) } catch {}
}

export function logout() {
  removeToken()
}

function parseJwt(token: string | null) {
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    const payload = (parts[1] || '').replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(atob(payload).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  const token = getToken()
  if (!token) return false
  const data = parseJwt(token)
  if (!data) return true // can't parse: assume token exists
  if (typeof data.exp === 'number') {
    const now = Math.floor(Date.now() / 1000)
    return data.exp > now
  }
  return true
}

interface ApiResponse<T> {
  data: T
  // you can expand this with pagination, status, etc. later
}

/**
 * Sends a POST request to the `/users` endpoint to create a new user.
 *
 * The backend is expected to be running either locally on port 8080 or in
 * production at the URL configured via `VITE_API_BASE_URL`.
 */
export async function registerUser(payload: RegisterPayload): Promise<void> {
  const url = `${getBaseUrl()}/users`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    // try to parse an error message or validation errors from the body
    let message = `request failed with status ${response.status}`
    try {
      const body = await response.json()
      // handle common shapes:
      // 1) { message: '...' }
      // 2) { errors: [ 'a', 'b' ] } or { errors: { field: ['msg'] } }
      // 3) { field: 'message' } or { field: ['message'] }
      if (body) {
        // explicit message
        if (body.message && typeof body.message === 'string') {
          message = body.message
        }

        // errors key
        else if (body.errors) {
          if (Array.isArray(body.errors)) {
            message = body.errors.map((e: any) => (typeof e === 'string' ? e : JSON.stringify(e))).join('\n')
          } else if (typeof body.errors === 'object') {
            const parts: string[] = []
            for (const k of Object.keys(body.errors)) {
              const v = body.errors[k]
              if (Array.isArray(v)) parts.push(...v.map((s: any) => (typeof s === 'string' ? s : JSON.stringify(s))))
              else parts.push(String(v))
            }
            if (parts.length) message = parts.join('\n')
          }
        }

        // top-level field -> message map (e.g. { email: 'e-mail já cadastrado' })
        else if (typeof body === 'object') {
          const parts: string[] = []
          for (const k of Object.keys(body)) {
            const v = body[k]
            if (typeof v === 'string') parts.push(v)
            else if (Array.isArray(v)) parts.push(...v.map((s: any) => (typeof s === 'string' ? s : JSON.stringify(s))))
          }
          if (parts.length) message = parts.join('\n')
        }
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(message)
  }

  // we don't need the resulting data yet since registration probably returns minimal information
}

/**
 * Login: POST /auth/login -> returns { token: string }
 */
export async function login(payload: LoginPayload): Promise<string> {
  const url = `${getBaseUrl()}/auth/login`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let message = `request failed with status ${response.status}`
    try {
      const body = await response.json()
      if (body) {
        if (body.message && typeof body.message === 'string') message = body.message
        else if (body.errors && Array.isArray(body.errors)) message = body.errors.join('\n')
        else if (typeof body === 'object') {
          const parts: string[] = []
          for (const k of Object.keys(body)) {
            const v = body[k]
            if (typeof v === 'string') parts.push(v)
            else if (Array.isArray(v)) parts.push(...v.map((s: any) => (typeof s === 'string' ? s : JSON.stringify(s))))
          }
          if (parts.length) message = parts.join('\n')
        }
      }
    } catch {}
    throw new Error(message)
  }

  const data = await response.json()
  const token = data?.token || data?.accessToken || null
  if (!token) throw new Error('Resposta inválida do servidor')
  setToken(token)
  return token
}

// --------------------------------------------------------------------------------
// authenticated user helpers

export interface User {
  id: number
  nome: string
  email: string
  crmv: string
}

/**
 * Fetch the authenticated user's data from `/users/me`.
 *
 * The request includes the Authorization header if a token is stored.
 */
export async function getCurrentUser(): Promise<User> {
  const url = `${getBaseUrl()}/users/me`
  const token = getToken()
  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, { headers })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`failed to fetch current user: ${response.status} ${text}`)
  }
  const data = await response.json()
  return data as User
}
