import { FEATURE_CATALOG } from '@rnd/catalog'
import type { FrontendFeatureManifest } from '@/core/types'

import { guardiansAdminRoutes } from '@/features/guardians/admin/routes'
import { guardiansPublicRoutes } from '@/features/guardians/public/routes'

export const guardiansFeatureManifest: FrontendFeatureManifest = {
  key: 'guardians',
  surfaces: {
    public: {
      routes: guardiansPublicRoutes,
      navItems: [
        {
          label: FEATURE_CATALOG.guardians.label,
          to: '/guardians',
          description: 'Guardian contacts and support directory',
        },
      ],
    },
    admin: {
      routes: guardiansAdminRoutes,
      navItems: [
        {
          label: FEATURE_CATALOG.guardians.label,
          to: '/admin/guardians',
          description: 'Manage guardian contacts and follow-ups',
        },
      ],
    },
  },
}
