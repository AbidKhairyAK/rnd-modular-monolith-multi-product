import GuardianContact from '#features/guardians/models/guardian_contact'

export default class GuardiansAdminController {
  async index() {
    return GuardianContact.query().orderBy('studentName')
  }
}
