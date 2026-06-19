import { registerClassesAdminRoutes } from '#features/classes/admin/routes'
import { registerClassesPublicRoutes } from '#features/classes/public/routes'
import type { BackendFeatureManifest } from '#services/feature_registry'

export const classesFeatureManifest: BackendFeatureManifest = {
  registerPublicRoutes: registerClassesPublicRoutes,
  registerAdminRoutes: registerClassesAdminRoutes,
}
