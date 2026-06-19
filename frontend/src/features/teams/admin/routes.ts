import type { RouteRecordRaw } from 'vue-router'

import TeamsAdminPage from '@/features/teams/admin/pages/TeamsAdminPage.vue'

export const teamsAdminRoutes: RouteRecordRaw[] = [
  {
    path: 'teams',
    name: 'admin-teams',
    component: TeamsAdminPage,
    meta: {
      surface: 'admin',
      title: 'Teams Admin',
    },
  },
]
