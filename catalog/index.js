import featureEntries from './features.json' with { type: 'json' }
import productEntries from './products.json' with { type: 'json' }

export const PRODUCT_OPTIONS = productEntries.map((product) => product.key)

export const FEATURE_OPTIONS = featureEntries.map((feature) => feature.key)

export const PRODUCT_CATALOG = Object.fromEntries(
  productEntries.map((product) => [product.key, product])
)

export const FEATURE_CATALOG = Object.fromEntries(
  featureEntries.map((feature) => [feature.key, feature])
)

export function isProductKey(value) {
  return typeof value === 'string' && PRODUCT_OPTIONS.includes(value)
}

export function isFeatureKey(value) {
  return typeof value === 'string' && FEATURE_OPTIONS.includes(value)
}

export function getSupportedFeatures(productKey) {
  return PRODUCT_CATALOG[productKey]?.supportedFeatureKeys ?? []
}

export function areFeaturesCompatible(productKey, featureKeys) {
  const supported = new Set(getSupportedFeatures(productKey))
  return featureKeys.every((featureKey) => supported.has(featureKey))
}
