import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import ClassesPublicController from '#features/classes/public/classes_public_controller'

export function registerClassesPublicRoutes() {
  router.get('classes', [ClassesPublicController, 'index']).use(middleware.feature({ feature: 'classes' }))
}
