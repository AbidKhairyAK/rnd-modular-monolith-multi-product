import { fetchBackendJson } from '@/app/api/backend'
import type { ComplianceRecord } from '@/core/types'

export function loadPublicCompliance() {
  return fetchBackendJson<ComplianceRecord[]>('/api/v1/public/compliance')
}
