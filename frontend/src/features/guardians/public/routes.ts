import type { RouteRecordRaw } from 'vue-router'

import GuardiansPage from '@/features/guardians/public/pages/GuardiansPage.vue'

export const guardiansPublicRoutes: RouteRecordRaw[] = [
  {
    path: 'guardians',
    name: 'public-guardians',
    component: GuardiansPage,
    meta: {
      surface: 'public',
      title: 'Guardians',
    },
  },
]
