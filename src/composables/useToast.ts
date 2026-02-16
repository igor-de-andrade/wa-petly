import { reactive } from 'vue'

export type ToastType = 'success' | 'error' | 'warning'
export type Toast = { id: number; message: string; type: ToastType }

const toasts = reactive<Toast[]>([])
let nextId = 1

function removeToast(id: number) {
  const idx = toasts.findIndex((t) => t.id === id)
  if (idx !== -1) toasts.splice(idx, 1)
}

function showToast(message: string, type: ToastType = 'success', duration = 8000) {
  const id = nextId++
  toasts.push({ id, message, type })
  setTimeout(() => removeToast(id), duration)
  return id
}

export function useToast() {
  function showSuccess(message: string, duration = 5000) {
    return showToast(message, 'success', duration)
  }

  function showError(message: string, duration = 10000) {
    return showToast(message, 'error', duration)
  }

  function showWarning(message: string, duration = 8000) {
    return showToast(message, 'warning', duration)
  }

  return { toasts, showSuccess, showError, showWarning, removeToast }
}

export default useToast
