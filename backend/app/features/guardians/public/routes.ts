import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import GuardiansPublicController from '#features/guardians/public/guardians_public_controller'

export function registerGuardiansPublicRoutes() {
  router
    .get('guardians', [GuardiansPublicController, 'index'])
    .use(middleware.feature({ feature: 'guardians' }))
}
