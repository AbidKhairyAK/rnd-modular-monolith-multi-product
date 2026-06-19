import type { RouteRecordRaw } from 'vue-router'

import ClassesPage from '@/features/classes/public/pages/ClassesPage.vue'

export const classesPublicRoutes: RouteRecordRaw[] = [
  {
    path: 'classes',
    name: 'public-classes',
    component: ClassesPage,
    meta: {
      surface: 'public',
      title: 'Classes',
    },
  },
]
