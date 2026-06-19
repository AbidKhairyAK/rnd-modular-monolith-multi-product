import GuardianContact from '#features/guardians/models/guardian_contact'

export default class GuardiansPublicController {
  async index() {
    return GuardianContact.query().orderBy('studentName')
  }
}
