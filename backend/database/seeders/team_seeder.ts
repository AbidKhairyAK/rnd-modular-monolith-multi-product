import { BaseSeeder } from '@adonisjs/lucid/seeders'

import TeamOverview from '#features/teams/models/team_overview'

const teams = [
  {
    id: 'team-a1',
    teamName: 'Customer Success',
    managerName: 'Dina Suryani',
    memberCount: 12,
    focusArea: 'Renewal readiness',
    progress: 82,
    status: 'On Track' as const,
  },
  {
    id: 'team-a2',
    teamName: 'Sales Enablement',
    managerName: 'Bagus Kurniawan',
    memberCount: 9,
    focusArea: 'Pitch certification',
    progress: 58,
    status: 'Needs Attention' as const,
  },
  {
    id: 'team-a3',
    teamName: 'Operations',
    managerName: 'Mira Setiawan',
    memberCount: 15,
    focusArea: 'Tooling migration',
    progress: 34,
    status: 'At Risk' as const,
  },
]

export default class extends BaseSeeder {
  async run() {
    for (const team of teams) {
      await TeamOverview.updateOrCreate({ id: team.id }, team)
    }
  }
}
