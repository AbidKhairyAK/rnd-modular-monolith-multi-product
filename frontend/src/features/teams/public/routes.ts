import type { RouteRecordRaw } from 'vue-router'

import TeamsPage from '@/features/teams/public/pages/TeamsPage.vue'

export const teamsPublicRoutes: RouteRecordRaw[] = [
  {
    path: 'teams',
    name: 'public-teams',
    component: TeamsPage,
    meta: {
      surface: 'public',
      title: 'Teams',
    },
  },
]
