import SchoolClass from '#features/classes/models/school_class'

export default class ClassesAdminController {
  async index() {
    return SchoolClass.query().orderBy('name')
  }
}
