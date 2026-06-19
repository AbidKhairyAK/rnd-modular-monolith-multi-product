import { fetchBackendJson } from '@/app/api/backend'
import type { GuardianContact } from '@/core/types'

export function loadPublicGuardians() {
  return fetchBackendJson<GuardianContact[]>('/api/v1/public/guardians')
}
