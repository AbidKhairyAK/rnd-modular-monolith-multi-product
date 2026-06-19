import RuntimeConfig from '#models/runtime_config'
import {
  PRODUCT_CATALOG,
  areFeaturesCompatible,
  type FeatureKey as CatalogFeatureKey,
  type ProductKey as CatalogProductKey,
} from '@rnd/catalog'

export type RuntimeConfigPayload = {
  productKey: CatalogProductKey
  enabledFeatures: CatalogFeatureKey[]
}

export function getDefaultRuntimeConfig(): RuntimeConfigPayload {
  return {
    productKey: 'school',
    enabledFeatures: [...PRODUCT_CATALOG.school.supportedFeatureKeys],
  }
}

export async function getCurrentRuntimeConfigRecord() {
  const defaults = getDefaultRuntimeConfig()

  return RuntimeConfig.firstOrCreate({ id: 1 }, defaults)
}

export async function getCurrentRuntimeConfig(): Promise<RuntimeConfigPayload> {
  const runtimeConfig = await getCurrentRuntimeConfigRecord()

  return serializeRuntimeConfig(runtimeConfig)
}

export async function updateCurrentRuntimeConfig(payload: RuntimeConfigPayload) {
  const runtimeConfig = await getCurrentRuntimeConfigRecord()

  runtimeConfig.merge(payload)
  await runtimeConfig.save()

  return runtimeConfig
}

export function serializeRuntimeConfig(runtimeConfig: Pick<RuntimeConfig, 'productKey' | 'enabledFeatures'>) {
  return {
    productKey: runtimeConfig.productKey,
    enabledFeatures: [...runtimeConfig.enabledFeatures],
  } satisfies RuntimeConfigPayload
}

export function isRuntimeConfigCompatible(payload: RuntimeConfigPayload) {
  return areFeaturesCompatible(payload.productKey, payload.enabledFeatures)
}
