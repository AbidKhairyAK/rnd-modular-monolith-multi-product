export class BackendApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'BackendApiError'
    this.status = status
  }
}

function getBackendApiUrl() {
  const baseUrl = import.meta.env.VITE_BACKEND_API_URL

  if (!baseUrl) {
    throw new Error('Missing VITE_BACKEND_API_URL.')
  }

  return baseUrl.replace(/\/$/, '')
}

export async function fetchBackendJson<T>(path: string): Promise<T> {
  const response = await fetch(`${getBackendApiUrl()}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new BackendApiError(`Backend request failed (${response.status}).`, response.status)
  }

  return response.json() as Promise<T>
}
