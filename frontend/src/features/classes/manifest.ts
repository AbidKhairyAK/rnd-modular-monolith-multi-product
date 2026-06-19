import { FEATURE_CATALOG } from '@rnd/catalog'
import type { FrontendFeatureManifest } from '@/core/types'

import { classesAdminRoutes } from '@/features/classes/admin/routes'
import { classesPublicRoutes } from '@/features/classes/public/routes'
import ClassesAdminHomeWidget from '@/features/classes/admin/widgets/ClassesAdminHomeWidget.vue'
import ClassesPublicHomeWidget from '@/features/classes/public/widgets/ClassesPublicHomeWidget.vue'

export const classesFeatureManifest: FrontendFeatureManifest = {
  key: 'classes',
  surfaces: {
    public: {
      routes: classesPublicRoutes,
      navItems: [
        {
          label: FEATURE_CATALOG.classes.label,
          to: '/classes',
          description: 'Homeroom and schedule management',
        },
      ],
    },
    admin: {
      routes: classesAdminRoutes,
      navItems: [
        {
          label: FEATURE_CATALOG.classes.label,
          to: '/admin/classes',
          description: 'Manage class schedules and assignments',
        },
      ],
    },
  },
  widgets: [
    {
      id: 'classes-public-home',
      slot: 'public-home-main',
      order: 20,
      component: ClassesPublicHomeWidget,
    },
    {
      id: 'classes-admin-home',
      slot: 'admin-home-main',
      order: 20,
      component: ClassesAdminHomeWidget,
    },
  ],
}
