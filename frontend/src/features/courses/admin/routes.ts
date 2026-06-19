import type { RouteRecordRaw } from 'vue-router'

import CoursesAdminPage from '@/features/courses/admin/pages/CoursesAdminPage.vue'

export const coursesAdminRoutes: RouteRecordRaw[] = [
  {
    path: 'courses',
    name: 'admin-courses',
    component: CoursesAdminPage,
    meta: {
      surface: 'admin',
      title: 'Courses Admin',
    },
  },
]
