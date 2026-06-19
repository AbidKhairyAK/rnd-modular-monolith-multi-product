import router from '@adonisjs/core/services/router'

import CoursesPublicController from '#features/courses/public/courses_public_controller'

export function registerCoursesPublicRoutes() {
  router.get('courses', [CoursesPublicController, 'index'])
}
