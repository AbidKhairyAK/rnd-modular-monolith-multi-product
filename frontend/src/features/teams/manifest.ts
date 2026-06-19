import { FEATURE_CATALOG } from '@rnd/catalog'
import type { FrontendFeatureManifest } from '@/core/types'

import { teamsAdminRoutes } from '@/features/teams/admin/routes'
import { teamsPublicRoutes } from '@/features/teams/public/routes'

export const teamsFeatureManifest: FrontendFeatureManifest = {
  key: 'teams',
  surfaces: {
    public: {
      routes: teamsPublicRoutes,
      navItems: [
        {
          label: FEATURE_CATALOG.teams.label,
          to: '/teams',
          description: 'Manager and team learning-path oversight',
        },
      ],
    },
    admin: {
      routes: teamsAdminRoutes,
      navItems: [
        {
          label: FEATURE_CATALOG.teams.label,
          to: '/admin/teams',
          description: 'Monitor team learning progress and risk',
        },
      ],
    },
  },
}
