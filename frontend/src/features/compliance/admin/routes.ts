import type { RouteRecordRaw } from 'vue-router'

import ComplianceAdminPage from '@/features/compliance/admin/pages/ComplianceAdminPage.vue'

export const complianceAdminRoutes: RouteRecordRaw[] = [
  {
    path: 'compliance',
    name: 'admin-compliance',
    component: ComplianceAdminPage,
    meta: {
      surface: 'admin',
      title: 'Compliance Admin',
    },
  },
]
