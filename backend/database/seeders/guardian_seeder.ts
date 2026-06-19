import { BaseSeeder } from '@adonisjs/lucid/seeders'

import GuardianContact from '#features/guardians/models/guardian_contact'

const guardians = [
  {
    id: 'guardian-a1',
    studentName: 'Aulia Putra',
    guardianName: 'Rina Putri',
    relation: 'Mother',
    phone: '+62 812-1000-1001',
    email: 'rina.putri@example.com',
    status: 'Active' as const,
  },
  {
    id: 'guardian-a2',
    studentName: 'Bagas Rahman',
    guardianName: 'Dedi Rahman',
    relation: 'Father',
    phone: '+62 812-1000-1002',
    email: 'dedi.rahman@example.com',
    status: 'Needs Review' as const,
  },
  {
    id: 'guardian-a3',
    studentName: 'Citra Wulandari',
    guardianName: 'Maya Wulandari',
    relation: 'Aunt',
    phone: '+62 812-1000-1003',
    email: 'maya.wulandari@example.com',
    status: 'Inactive' as const,
  },
]

export default class extends BaseSeeder {
  async run() {
    for (const guardian of guardians) {
      await GuardianContact.updateOrCreate({ id: guardian.id }, guardian)
    }
  }
}
