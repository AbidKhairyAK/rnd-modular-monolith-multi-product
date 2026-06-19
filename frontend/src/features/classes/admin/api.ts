import { fetchBackendJson } from '@/app/api/backend'
import type { ClassAdminRow } from '@/core/types'

export function loadAdminClasses() {
  return fetchBackendJson<ClassAdminRow[]>('/api/v1/admin/classes')
}
