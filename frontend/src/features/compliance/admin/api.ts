import { fetchBackendJson } from '@/app/api/backend'
import type { ComplianceRecord } from '@/core/types'

export function loadAdminCompliance() {
  return fetchBackendJson<ComplianceRecord[]>('/api/v1/admin/compliance')
}
