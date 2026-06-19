import { fetchBackendJson } from '@/app/api/backend'
import type { TeamOverview } from '@/core/types'

export function loadPublicTeams() {
  return fetchBackendJson<TeamOverview[]>('/api/v1/public/teams')
}
