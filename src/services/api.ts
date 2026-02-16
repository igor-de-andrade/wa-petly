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
