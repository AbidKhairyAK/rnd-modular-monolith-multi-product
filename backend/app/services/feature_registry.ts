import { classesFeatureManifest } from '#features/classes/manifest'
import { complianceFeatureManifest } from '#features/compliance/manifest'
import { coursesFeatureManifest } from '#features/courses/manifest'
import { guardiansFeatureManifest } from '#features/guardians/manifest'
import { teamsFeatureManifest } from '#features/teams/manifest'

export type BackendFeatureManifest = {
  registerAdminRoutes: () => void
  registerPublicRoutes: () => void
}

const featureManifests: BackendFeatureManifest[] = [
  coursesFeatureManifest,
  classesFeatureManifest,
  complianceFeatureManifest,
  guardiansFeatureManifest,
  teamsFeatureManifest,
]

export function registerPublicFeatureRoutes() {
  featureManifests.forEach((feature) => feature.registerPublicRoutes())
}

export function registerAdminFeatureRoutes() {
  featureManifests.forEach((feature) => feature.registerAdminRoutes())
}
