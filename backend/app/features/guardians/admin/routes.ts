import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import GuardiansAdminController from '#features/guardians/admin/guardians_admin_controller'

export function registerGuardiansAdminRoutes() {
  router
    .get('guardians', [GuardiansAdminController, 'index'])
    .use(middleware.feature({ feature: 'guardians' }))
}
