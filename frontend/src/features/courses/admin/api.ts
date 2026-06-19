import { fetchBackendJson } from '@/app/api/backend'
import type { Course } from '@/core/types'

export function loadAdminCourses() {
  return fetchBackendJson<Course[]>('/api/v1/admin/courses')
}
