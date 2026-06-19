import Course from '#features/courses/models/course'

export default class CoursesAdminController {
  async index() {
    return Course.query().orderBy('title')
  }
}
