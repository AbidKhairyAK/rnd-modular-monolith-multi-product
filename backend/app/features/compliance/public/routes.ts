import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import CompliancePublicController from '#features/compliance/public/compliance_public_controller'

export function registerCompliancePublicRoutes() {
  router
    .get('compliance', [CompliancePublicController, 'index'])
    .use(middleware.feature({ feature: 'compliance' }))
}
