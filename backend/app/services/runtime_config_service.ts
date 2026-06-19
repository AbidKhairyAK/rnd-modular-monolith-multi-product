import env from '#start/env'
import {
  areFeaturesCompatible,
  isFeatureKey,
  isProductKey,
  type FeatureKey as CatalogFeatureKey,
  type ProductKey as CatalogProductKey,
} from '@rnd/catalog'

export type RuntimeConfigPayload = {
  productKey: CatalogProductKey
  enabledFeatures: CatalogFeatureKey[]
}

export type RuntimeConfigState = {
  config: RuntimeConfigPayload
  refreshedAt: string
}

let runtimeConfigState: RuntimeConfigState | null = null

function getLandlordRuntimeConfigUrl() {
  return `${env.get('LANDLORD_API_URL').replace(/\/$/, '')}/api/v1/runtime-config`
}

function validateRuntimeConfig(payload: unknown): RuntimeConfigPayload {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Landlord runtime config payload is invalid.')
  }

  const { productKey, enabledFeatures } = payload as {
    productKey?: unknown
    enabledFeatures?: unknown
  }

  if (!isProductKey(productKey)) {
    throw new Error('Landlord runtime config contains an invalid productKey.')
  }

  if (!Array.isArray(enabledFeatures) || !enabledFeatures.every((featureKey) => isFeatureKey(featureKey))) {
    throw new Error('Landlord runtime config contains invalid enabledFeatures.')
  }

  const featureKeys = [...enabledFeatures] as CatalogFeatureKey[]

  if (!areFeaturesCompatible(productKey, featureKeys)) {
    throw new Error('Landlord runtime config contains incompatible product/feature data.')
  }

  return {
    productKey,
    enabledFeatures: featureKeys,
  }
}

async function syncRuntimeConfig() {
  const response = await fetch(getLandlordRuntimeConfigUrl(), {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to load landlord runtime config (${response.status}).`)
  }

  const config = validateRuntimeConfig(await response.json())

  runtimeConfigState = {
    config,
    refreshedAt: new Date().toISOString(),
  }

  return runtimeConfigState
}

export async function loadInitialRuntimeConfig() {
  return syncRuntimeConfig()
}

export async function refreshRuntimeConfig() {
  return syncRuntimeConfig()
}

export function getRuntimeConfig() {
  if (!runtimeConfigState) {
    throw new Error('Runtime config has not been loaded yet.')
  }

  return runtimeConfigState.config
}

export function isFeatureEnabled(featureKey: CatalogFeatureKey) {
  return getRuntimeConfig().enabledFeatures.includes(featureKey)
}
