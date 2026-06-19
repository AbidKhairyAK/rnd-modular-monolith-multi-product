import ComplianceRecord from '#features/compliance/models/compliance_record'

export default class ComplianceAdminController {
  async index() {
    return ComplianceRecord.query().orderBy('employeeName')
  }
}
