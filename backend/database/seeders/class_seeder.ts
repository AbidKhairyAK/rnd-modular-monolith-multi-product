import { BaseSeeder } from '@adonisjs/lucid/seeders'

import SchoolClass from '#features/classes/models/school_class'

const classes = [
  {
    id: 'class-a1',
    name: 'Class 7A',
    homeroomTeacher: 'Alya Putri',
    students: 30,
    schedule: 'Mon-Wed-Fri',
    status: 'Active' as const,
  },
  {
    id: 'class-a2',
    name: 'Class 8B',
    homeroomTeacher: 'Bima Rahardian',
    students: 28,
    schedule: 'Tue-Thu-Fri',
    status: 'Needs Review' as const,
  },
  {
    id: 'class-a3',
    name: 'Class 9C',
    homeroomTeacher: 'Clara Hartono',
    students: 32,
    schedule: 'Mon-Thu-Fri',
    status: 'Draft' as const,
  },
]

export default class extends BaseSeeder {
  async run() {
    for (const classroom of classes) {
      await SchoolClass.updateOrCreate({ id: classroom.id }, classroom)
    }
  }
}
