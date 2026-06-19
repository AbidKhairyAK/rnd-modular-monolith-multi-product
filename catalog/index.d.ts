export type ProductId = 'school' | 'corporate'

export type FeatureKey = 'classes' | 'guardians' | 'compliance' | 'teams'

export type ProductCatalogEntry = {
  id: ProductId
  label: string
  supportedFeatures: FeatureKey[]
}

export type FeatureCatalogEntry = {
  key: FeatureKey
  label: string
  description: string
  supportedProducts: ProductId[]
}

export declare const PRODUCT_OPTIONS: ProductId[]
export declare const FEATURE_OPTIONS: FeatureKey[]
export declare const PRODUCT_CATALOG: Record<ProductId, ProductCatalogEntry>
export declare const FEATURE_CATALOG: Record<FeatureKey, FeatureCatalogEntry>

export declare function isProductId(value: unknown): value is ProductId
export declare function isFeatureKey(value: unknown): value is FeatureKey
export declare function getSupportedFeatures(productId: ProductId): FeatureKey[]
export declare function areFeaturesCompatible(productId: ProductId, featureKeys: FeatureKey[]): boolean
