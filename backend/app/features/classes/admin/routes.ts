import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import ClassesAdminController from '#features/classes/admin/classes_admin_controller'

export function registerClassesAdminRoutes() {
  router.get('classes', [ClassesAdminController, 'index']).use(middleware.feature({ feature: 'classes' }))
}
