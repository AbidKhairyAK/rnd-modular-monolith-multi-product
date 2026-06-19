export const PRODUCT_OPTIONS = ['school', 'corporate']

export const FEATURE_OPTIONS = ['classes', 'guardians', 'compliance', 'teams']

export const PRODUCT_CATALOG = {
  school: {
    id: 'school',
    label: 'School LMS',
    supportedFeatures: ['classes', 'guardians'],
  },
  corporate: {
    id: 'corporate',
    label: 'Corporate LMS',
    supportedFeatures: ['compliance', 'teams'],
  },
}

export const FEATURE_CATALOG = {
  classes: {
    key: 'classes',
    label: 'Classes',
    description: 'Homeroom and schedule management for school LMS.',
    supportedProducts: ['school'],
  },
  guardians: {
    key: 'guardians',
    label: 'Guardians',
    description: 'Parent and guardian contact workflows for school LMS.',
    supportedProducts: ['school'],
  },
  compliance: {
    key: 'compliance',
    label: 'Compliance',
    description: 'Mandatory training status and due dates for corporate LMS.',
    supportedProducts: ['corporate'],
  },
  teams: {
    key: 'teams',
    label: 'Teams',
    description: 'Manager and team learning-path oversight for corporate LMS.',
    supportedProducts: ['corporate'],
  },
}

export function isProductId(value) {
  return typeof value === 'string' && PRODUCT_OPTIONS.includes(value)
}

export function isFeatureKey(value) {
  return typeof value === 'string' && FEATURE_OPTIONS.includes(value)
}

export function getSupportedFeatures(productId) {
  return PRODUCT_CATALOG[productId]?.supportedFeatures ?? []
}

export function areFeaturesCompatible(productId, featureKeys) {
  const supported = new Set(getSupportedFeatures(productId))
  return featureKeys.every((featureKey) => supported.has(featureKey))
}
