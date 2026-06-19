import { fetchBackendJson } from '@/app/api/backend'
import type { GuardianContact } from '@/core/types'

export function loadAdminGuardians() {
  return fetchBackendJson<GuardianContact[]>('/api/v1/admin/guardians')
}
