import { BaseSeeder } from '@adonisjs/lucid/seeders'

import ComplianceRecord from '#features/compliance/models/compliance_record'

const complianceRecords = [
  {
    id: 'compliance-a1',
    employeeName: 'Nadia Pratama',
    moduleName: 'Workplace Safety Basics',
    dueDate: '2026-06-30',
    completion: 100,
    status: 'Completed' as const,
  },
  {
    id: 'compliance-a2',
    employeeName: 'Rafi Aditya',
    moduleName: 'Data Privacy Essentials',
    dueDate: '2026-06-20',
    completion: 65,
    status: 'Due Soon' as const,
  },
  {
    id: 'compliance-a3',
    employeeName: 'Tania Lestari',
    moduleName: 'Code of Conduct Review',
    dueDate: '2026-06-10',
    completion: 30,
    status: 'Overdue' as const,
  },
]

export default class extends BaseSeeder {
  async run() {
    for (const record of complianceRecords) {
      await ComplianceRecord.updateOrCreate({ id: record.id }, record)
    }
  }
}
