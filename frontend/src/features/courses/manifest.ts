import type { SharedFeatureManifest } from '@/core/types'

import { coursesAdminRoutes } from '@/features/courses/admin/routes'
import { coursesPublicRoutes } from '@/features/courses/public/routes'
import CoursesAdminHomeWidget from '@/features/courses/admin/widgets/CoursesAdminHomeWidget.vue'
import CoursesPublicHomeWidget from '@/features/courses/public/widgets/CoursesPublicHomeWidget.vue'

export const coursesFeatureManifest: SharedFeatureManifest = {
  surfaces: {
    public: {
      navItems: [
        {
          label: 'Courses',
          to: '/courses',
          description: 'Shared course catalog',
        },
      ],
      routes: coursesPublicRoutes,
    },
    admin: {
      navItems: [
        {
          label: 'Courses',
          to: '/admin/courses',
          description: 'Manage course catalog',
        },
      ],
      routes: coursesAdminRoutes,
    },
  },
  widgets: [
    {
      id: 'courses-public-home',
      slot: 'public-home-main',
      order: 10,
      component: CoursesPublicHomeWidget,
    },
    {
      id: 'courses-admin-home',
      slot: 'admin-home-main',
      order: 10,
      component: CoursesAdminHomeWidget,
    },
  ],
}
