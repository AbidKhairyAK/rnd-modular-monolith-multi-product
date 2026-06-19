import ComplianceRecord from '#features/compliance/models/compliance_record'

export default class CompliancePublicController {
  async index() {
    return ComplianceRecord.query().orderBy('employeeName')
  }
}
