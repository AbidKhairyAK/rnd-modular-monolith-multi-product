export type ProductKey = 'school' | 'corporate'

export type FeatureKey = 'classes' | 'guardians' | 'compliance' | 'teams'

export type ProductCatalogEntry = {
  key: ProductKey
  label: string
  supportedFeatureKeys: FeatureKey[]
}

export type FeatureCatalogEntry = {
  key: FeatureKey
  label: string
  description: string
  supportedProductKeys: ProductKey[]
}

export declare const PRODUCT_OPTIONS: ProductKey[]
export declare const FEATURE_OPTIONS: FeatureKey[]
export declare const PRODUCT_CATALOG: Record<ProductKey, ProductCatalogEntry>
export declare const FEATURE_CATALOG: Record<FeatureKey, FeatureCatalogEntry>

export declare function isProductKey(value: unknown): value is ProductKey
export declare function isFeatureKey(value: unknown): value is FeatureKey
export declare function getSupportedFeatures(productKey: ProductKey): FeatureKey[]
export declare function areFeaturesCompatible(productKey: ProductKey, featureKeys: FeatureKey[]): boolean
