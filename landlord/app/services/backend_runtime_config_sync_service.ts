import env from '#start/env'

function getBackendRefreshUrl() {
  return `${env.get('BACKEND_API_URL').replace(/\/$/, '')}/api/v1/internal/runtime-config/refresh`
}

export async function refreshBackendRuntimeConfig() {
  const response = await fetch(getBackendRefreshUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Backend runtime refresh failed with status ${response.status}.`)
  }

  return response.json().catch(() => null)
}
