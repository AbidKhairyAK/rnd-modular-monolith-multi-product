import SchoolClass from '#features/classes/models/school_class'

export default class ClassesPublicController {
  async index() {
    return SchoolClass.query().orderBy('name')
  }
}
