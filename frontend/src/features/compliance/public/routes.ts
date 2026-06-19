import type { RouteRecordRaw } from 'vue-router'

import CompliancePage from '@/features/compliance/public/pages/CompliancePage.vue'

export const compliancePublicRoutes: RouteRecordRaw[] = [
  {
    path: 'compliance',
    name: 'public-compliance',
    component: CompliancePage,
    meta: {
      surface: 'public',
      title: 'Compliance',
    },
  },
]
