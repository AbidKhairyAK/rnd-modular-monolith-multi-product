import { fetchBackendJson } from '@/app/api/backend'
import type { TeamOverview } from '@/core/types'

export function loadAdminTeams() {
  return fetchBackendJson<TeamOverview[]>('/api/v1/admin/teams')
}
