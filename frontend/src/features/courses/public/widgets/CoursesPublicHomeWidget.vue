<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { BackendApiError } from '@/app/api/backend'
import { useTenantWording } from '@/app/wording/useTenantWording'
import type { Course } from '@/core/types'
import { loadPublicCourses } from '@/features/courses/public/api'

const { wording } = useTenantWording()
const courses = ref<Course[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const courseWording = computed(() => wording.value.courses)
const totalCourses = computed(() => courses.value.length)
const totalLearners = computed(() =>
  courses.value.reduce((total, course) => total + course.learners, 0)
)

async function fetchCourses() {
  isLoading.value = true
  errorMessage.value = null

  try {
    courses.value = await loadPublicCourses()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = courseWording.value.widgetUnavailableState
    } else {
      errorMessage.value = error instanceof Error ? error.message : courseWording.value.widgetErrorState
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
  <article class="rounded-3xl border border-white/10 bg-white/6 p-6">
    <p class="text-sm uppercase tracking-[0.2em] text-slate-400">{{ courseWording.widgetEyebrow }}</p>
    <h3 class="mt-3 text-xl font-semibold text-white">{{ courseWording.widgetTitle }}</h3>
    <div
      v-if="isLoading"
      class="mt-4 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-slate-300"
    >
      {{ courseWording.widgetLoadingState }}
    </div>
    <div
      v-else-if="errorMessage"
      class="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100"
    >
      {{ errorMessage }}
    </div>
    <div v-else class="mt-4 grid gap-3 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ courseWording.widgetTotalLabel }}</p>
        <p class="mt-2 text-2xl font-semibold text-white">{{ totalCourses }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ courseWording.widgetParticipantsLabel }}</p>
        <p class="mt-2 text-2xl font-semibold text-white">{{ totalLearners }}</p>
      </div>
    </div>
    <p class="mt-4 text-sm leading-6 text-slate-300">
      {{ courseWording.widgetDescription }}
    </p>
    <RouterLink
      to="/courses"
      class="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:text-white"
    >
      {{ courseWording.widgetCta }}
    </RouterLink>
  </article>
</template>
