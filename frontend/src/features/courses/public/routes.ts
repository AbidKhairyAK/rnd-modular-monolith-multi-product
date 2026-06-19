import type { RouteRecordRaw } from 'vue-router'

import CoursesPage from '@/features/courses/public/pages/CoursesPage.vue'

export const coursesPublicRoutes: RouteRecordRaw[] = [
  {
    path: 'courses',
    name: 'public-courses',
    component: CoursesPage,
    meta: {
      surface: 'public',
      title: 'Courses',
    },
  },
]
