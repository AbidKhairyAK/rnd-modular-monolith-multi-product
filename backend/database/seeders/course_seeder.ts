import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Course from '#features/courses/models/course'

const courses = [
  {
    id: 'course-foundation',
    title: 'LMS Onboarding Essentials',
    category: 'Shared Core',
    owner: 'Learning Operations',
    learners: 96,
    progress: 76,
    status: 'Live' as const,
  },
  {
    id: 'course-blueprint',
    title: 'Shared Curriculum Blueprint',
    category: 'Shared Core',
    owner: 'Curriculum Office',
    learners: 42,
    progress: 38,
    status: 'Draft' as const,
  },
  {
    id: 'course-comms',
    title: 'Program Communication Kit',
    category: 'Operations',
    owner: 'Enablement Team',
    learners: 24,
    progress: 64,
    status: 'Review' as const,
  },
]

export default class extends BaseSeeder {
  async run() {
    for (const course of courses) {
      await Course.updateOrCreate({ id: course.id }, course)
    }
  }
}
