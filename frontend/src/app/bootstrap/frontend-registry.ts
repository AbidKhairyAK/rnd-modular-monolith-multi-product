import { FEATURE_CATALOG, PRODUCT_CATALOG } from '@rnd/catalog'
import type {
  AppRuntimeState,
  CatalogFeatureKey,
  CatalogProductKey,
  FeatureWidgetContribution,
  FrontendFeatureManifest,
  ProductUiManifest,
  ResolvedWidgetRegistry,
  SharedFeatureManifest,
} from '@/core/types'
import { classesFeatureManifest } from '@/features/classes/manifest'
import { complianceFeatureManifest } from '@/features/compliance/manifest'
import { coursesFeatureManifest } from '@/features/courses/manifest'
import { guardiansFeatureManifest } from '@/features/guardians/manifest'
import { teamsFeatureManifest } from '@/features/teams/manifest'
import { corporateProductManifest } from '@/products/corporate/manifest'
import { schoolProductManifest } from '@/products/school/manifest'

const productRegistry: Record<CatalogProductKey, ProductUiManifest> = {
  school: schoolProductManifest,
  corporate: corporateProductManifest,
}

const featureRegistry: Partial<Record<CatalogFeatureKey, FrontendFeatureManifest>> = {
  classes: classesFeatureManifest,
  compliance: complianceFeatureManifest,
  guardians: guardiansFeatureManifest,
  teams: teamsFeatureManifest,
}

const sharedFeatures: SharedFeatureManifest[] = [coursesFeatureManifest]

function sortWidgets(widgets: FeatureWidgetContribution[]) {
  return [...widgets].sort((left, right) => left.order - right.order)
}

function resolveWidgets(
  sharedFeatureManifests: SharedFeatureManifest[],
  enabledFeatureManifests: FrontendFeatureManifest[]
): ResolvedWidgetRegistry {
  const widgets = [...sharedFeatureManifests, ...enabledFeatureManifests].flatMap(
    (feature) => feature.widgets ?? []
  )

  return {
    publicHomeMain: sortWidgets(widgets.filter((widget) => widget.slot === 'public-home-main')),
    adminHomeMain: sortWidgets(widgets.filter((widget) => widget.slot === 'admin-home-main')),
  }
}

export function resolveProductUi(productKey: CatalogProductKey): ProductUiManifest {
  return productRegistry[productKey]
}

export function resolveEnabledFeatures(productKey: CatalogProductKey, enabledFeatureKeys: CatalogFeatureKey[]) {
  const supportedByCatalog = new Set(PRODUCT_CATALOG[productKey].supportedFeatureKeys)

  return enabledFeatureKeys.flatMap((featureKey) => {
    const feature = featureRegistry[featureKey]
    if (!feature) {
      if (import.meta.env.DEV) {
        console.warn(`[runtime-config] Unknown or unimplemented feature "${featureKey}" ignored.`)
      }
      return []
    }

    if (!supportedByCatalog.has(featureKey)) {
      if (import.meta.env.DEV) {
        console.warn(`[runtime-config] Feature "${featureKey}" not supported by product "${productKey}".`)
      }
      return []
    }

    if (!FEATURE_CATALOG[featureKey].supportedProductKeys.includes(productKey)) {
      if (import.meta.env.DEV) {
        console.warn(`[runtime-config] Feature "${featureKey}" rejected by shared catalog.`)
      }
      return []
    }

    return [feature]
  })
}

export function buildRuntimeState(config: AppRuntimeState['config']): AppRuntimeState {
  const enabledFeatures = resolveEnabledFeatures(config.productKey, config.enabledFeatures)

  return {
    config,
    product: resolveProductUi(config.productKey),
    enabledFeatures,
    sharedFeatures,
    widgets: resolveWidgets(sharedFeatures, enabledFeatures),
  }
}
