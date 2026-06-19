import type { RouteRecordRaw } from 'vue-router'

import GuardiansAdminPage from '@/features/guardians/admin/pages/GuardiansAdminPage.vue'

export const guardiansAdminRoutes: RouteRecordRaw[] = [
  {
    path: 'guardians',
    name: 'admin-guardians',
    component: GuardiansAdminPage,
    meta: {
      surface: 'admin',
      title: 'Guardians Admin',
    },
  },
]
