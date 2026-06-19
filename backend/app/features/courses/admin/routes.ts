import router from '@adonisjs/core/services/router'

import CoursesAdminController from '#features/courses/admin/courses_admin_controller'

export function registerCoursesAdminRoutes() {
  router.get('courses', [CoursesAdminController, 'index'])
}
