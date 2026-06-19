import { fetchBackendJson } from '@/app/api/backend'
import type { Course } from '@/core/types'

export function loadPublicCourses() {
  return fetchBackendJson<Course[]>('/api/v1/public/courses')
}
