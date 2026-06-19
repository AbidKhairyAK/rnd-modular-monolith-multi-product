import { FEATURE_CATALOG } from '@rnd/catalog'
import type { FrontendFeatureManifest } from '@/core/types'

import { complianceAdminRoutes } from '@/features/compliance/admin/routes'
import { compliancePublicRoutes } from '@/features/compliance/public/routes'

export const complianceFeatureManifest: FrontendFeatureManifest = {
  key: 'compliance',
  surfaces: {
    public: {
      routes: compliancePublicRoutes,
      navItems: [
        {
          label: FEATURE_CATALOG.compliance.label,
          to: '/compliance',
          description: 'Mandatory training status and due dates',
        },
      ],
    },
    admin: {
      routes: complianceAdminRoutes,
      navItems: [
        {
          label: FEATURE_CATALOG.compliance.label,
          to: '/admin/compliance',
          description: 'Monitor corporate compliance completion',
        },
      ],
    },
  },
}
