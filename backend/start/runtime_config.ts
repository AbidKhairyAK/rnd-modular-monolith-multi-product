import { loadInitialRuntimeConfig } from '#services/runtime_config_service'

const shouldLoadRuntimeConfig = process.argv.some((value) => {
  return value === 'serve' || value.startsWith('serve:') || value.endsWith('/server.js')
})

if (shouldLoadRuntimeConfig) {
  await loadInitialRuntimeConfig()
}
