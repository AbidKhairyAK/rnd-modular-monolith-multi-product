import { registerComplianceAdminRoutes } from '#features/compliance/admin/routes'
import { registerCompliancePublicRoutes } from '#features/compliance/public/routes'
import type { BackendFeatureManifest } from '#services/feature_registry'

export const complianceFeatureManifest: BackendFeatureManifest = {
  registerPublicRoutes: registerCompliancePublicRoutes,
  registerAdminRoutes: registerComplianceAdminRoutes,
}
