import { registerCoursesAdminRoutes } from '#features/courses/admin/routes'
import { registerCoursesPublicRoutes } from '#features/courses/public/routes'
import type { BackendFeatureManifest } from '#services/feature_registry'

export const coursesFeatureManifest: BackendFeatureManifest = {
  registerPublicRoutes: registerCoursesPublicRoutes,
  registerAdminRoutes: registerCoursesAdminRoutes,
}
