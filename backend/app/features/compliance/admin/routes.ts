import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import ComplianceAdminController from '#features/compliance/admin/compliance_admin_controller'

export function registerComplianceAdminRoutes() {
  router
    .get('compliance', [ComplianceAdminController, 'index'])
    .use(middleware.feature({ feature: 'compliance' }))
}
