import { registerTeamsAdminRoutes } from '#features/teams/admin/routes'
import { registerTeamsPublicRoutes } from '#features/teams/public/routes'
import type { BackendFeatureManifest } from '#services/feature_registry'

export const teamsFeatureManifest: BackendFeatureManifest = {
  registerPublicRoutes: registerTeamsPublicRoutes,
  registerAdminRoutes: registerTeamsAdminRoutes,
}
