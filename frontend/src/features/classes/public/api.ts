import { fetchBackendJson } from '@/app/api/backend'
import type { ClassOverview } from '@/core/types'

export function loadPublicClasses() {
  return fetchBackendJson<ClassOverview[]>('/api/v1/public/classes')
}
