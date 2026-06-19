import {
  areFeaturesCompatible,
  isFeatureKey,
  isProductKey,
  type FeatureKey as CatalogFeatureKey,
  type ProductKey as CatalogProductKey,
} from '@rnd/catalog'
import { buildRuntimeState } from '@/app/bootstrap/frontend-registry'
import type { AppRuntimeState, RuntimeConfig } from '@/core/types'

let runtimeState: AppRuntimeState | null = null

function getLandlordApiUrl() {
  const baseUrl = import.meta.env.VITE_LANDLORD_API_URL
  if (!baseUrl) {
    throw new Error('Missing VITE_LANDLORD_API_URL.')
  }

  return baseUrl.replace(/\/$/, '')
}

function validateRuntimeConfig(payload: unknown): RuntimeConfig {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Landlord runtime config is invalid.')
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

  if (!areFeaturesCompatible(productKey, enabledFeatures as CatalogFeatureKey[])) {
    throw new Error('Landlord runtime config contains incompatible product/feature data.')
  }

  return {
    productKey: productKey as CatalogProductKey,
    enabledFeatures: [...(enabledFeatures as CatalogFeatureKey[])],
  }
}

export async function bootstrapRuntime() {
  const response = await fetch(`${getLandlordApiUrl()}/api/v1/runtime-config`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to load runtime config from landlord (${response.status}).`)
  }

  const payload = await response.json()
  const config = validateRuntimeConfig(payload)
  const nextState = buildRuntimeState(config)
  runtimeState = nextState

  return nextState
}

export function getRuntimeState() {
  if (!runtimeState) {
    throw new Error('Runtime state has not been initialized yet.')
  }

  return runtimeState
}

export function getCurrentProduct() {
  return getRuntimeState().product
}
