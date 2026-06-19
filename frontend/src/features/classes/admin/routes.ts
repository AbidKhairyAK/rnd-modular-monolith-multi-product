import type { RouteRecordRaw } from 'vue-router'

import ClassesAdminPage from '@/features/classes/admin/pages/ClassesAdminPage.vue'

export const classesAdminRoutes: RouteRecordRaw[] = [
  {
    path: 'classes',
    name: 'admin-classes',
    component: ClassesAdminPage,
    meta: {
      surface: 'admin',
      title: 'Classes Admin',
    },
  },
]
