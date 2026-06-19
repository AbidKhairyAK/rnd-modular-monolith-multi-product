<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { BackendApiError } from '@/app/api/backend'
import type { Course } from '@/core/types'
import { loadAdminCourses } from '@/features/courses/admin/api'

const courseRows = ref<Course[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const totalCourses = computed(() => courseRows.value.length)
const liveCourses = computed(() => courseRows.value.filter((course) => course.status === 'Live').length)

async function fetchCourses() {
  isLoading.value = true
  errorMessage.value = null

  try {
    courseRows.value = await loadAdminCourses()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Courses admin unavailable.'
    } else {
      errorMessage.value = error instanceof Error ? error.message : 'Unable to load courses admin.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void fetchCourses()
})
</script>

<template>
  <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Shared widget</p>
    <h3 class="mt-3 text-xl font-semibold text-slate-950">Courses admin</h3>
    <div
      v-if="isLoading"
      class="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
    >
      Loading course operations...
    </div>
    <div
      v-else-if="errorMessage"
      class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
    >
      {{ errorMessage }}
    </div>
    <div v-else class="mt-4 grid gap-3 sm:grid-cols-2">
      <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Catalog items</p>
        <p class="mt-2 text-2xl font-semibold text-slate-950">{{ totalCourses }}</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Live now</p>
        <p class="mt-2 text-2xl font-semibold text-slate-950">{{ liveCourses }}</p>
      </div>
    </div>
    <p class="mt-4 text-sm leading-6 text-slate-600">
      Shared admin capabilities can contribute operational widgets to the admin home without being
      imported directly by the host page.
    </p>
    <RouterLink
      to="/admin/courses"
      class="mt-5 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
    >
      Open Courses Admin
    </RouterLink>
  </article>
</template>
