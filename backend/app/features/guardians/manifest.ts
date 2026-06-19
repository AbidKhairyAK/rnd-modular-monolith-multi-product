import { registerGuardiansAdminRoutes } from '#features/guardians/admin/routes'
import { registerGuardiansPublicRoutes } from '#features/guardians/public/routes'
import type { BackendFeatureManifest } from '#services/feature_registry'

export const guardiansFeatureManifest: BackendFeatureManifest = {
  registerPublicRoutes: registerGuardiansPublicRoutes,
  registerAdminRoutes: registerGuardiansAdminRoutes,
}
