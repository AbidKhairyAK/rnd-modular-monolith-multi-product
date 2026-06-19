import { refreshRuntimeConfig } from '#services/runtime_config_service'

export default class RuntimeConfigRefreshController {
  async store() {
    const state = await refreshRuntimeConfig()

    return {
      status: 'ok' as const,
      runtimeConfig: state.config,
      refreshedAt: state.refreshedAt,
    }
  }
}
