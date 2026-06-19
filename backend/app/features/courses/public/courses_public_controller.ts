import Course from '#features/courses/models/course'

export default class CoursesPublicController {
  async index() {
    return Course.query().orderBy('title')
  }
}
