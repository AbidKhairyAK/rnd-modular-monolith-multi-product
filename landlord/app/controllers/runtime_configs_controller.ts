import {
  FEATURE_CATALOG,
  PRODUCT_CATALOG,
  PRODUCT_OPTIONS,
  type FeatureKey as CatalogFeatureKey,
  type ProductKey as CatalogProductKey,
} from '@rnd/catalog'
import { runtimeConfigValidator } from '#validators/runtime_config'
import {
  getCurrentRuntimeConfig,
  isRuntimeConfigCompatible,
  updateCurrentRuntimeConfig,
} from '#services/runtime_config_service'
import { refreshBackendRuntimeConfig } from '#services/backend_runtime_config_sync_service'
import type { HttpContext } from '@adonisjs/core/http'

function buildSettingsOptions() {
  return {
    products: PRODUCT_OPTIONS.map((productKey) => ({
      key: productKey,
      label: PRODUCT_CATALOG[productKey].label,
      supportedFeatureKeys: PRODUCT_CATALOG[productKey].supportedFeatureKeys,
    })),
    features: Object.values(FEATURE_CATALOG).map((feature) => ({
      key: feature.key,
      label: feature.label,
      description: feature.description,
      supportedProductKeys: feature.supportedProductKeys,
    })),
  }
}

export default class RuntimeConfigsController {
  async index({ inertia }: HttpContext) {
    const runtimeConfig = await getCurrentRuntimeConfig()

    return inertia.render('home', {
      runtimeConfig,
      ...buildSettingsOptions(),
    })
  }

  async update({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(runtimeConfigValidator)
    const runtimeConfig = {
      productKey: payload.productKey as CatalogProductKey,
      enabledFeatures: (payload.enabledFeatures ?? []) as CatalogFeatureKey[],
    }

    if (!isRuntimeConfigCompatible(runtimeConfig)) {
      session.flash('error', 'Selected features are not compatible with the chosen product.')
      return response.redirect().back()
    }

    await updateCurrentRuntimeConfig(runtimeConfig)

    try {
      await refreshBackendRuntimeConfig()
      session.flash('success', 'Tenant runtime config updated and backend runtime refreshed.')
    } catch (error) {
      console.error(error)
      session.flash('error', 'Tenant runtime config updated, but backend runtime refresh failed.')
    }

    return response.redirect().toRoute('home')
  }

  async show() {
    return getCurrentRuntimeConfig()
  }
}
