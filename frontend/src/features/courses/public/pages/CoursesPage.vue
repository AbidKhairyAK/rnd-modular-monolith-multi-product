<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import { useTenantWording } from '@/app/wording/useTenantWording'
import type { Course } from '@/core/types'
import { loadPublicCourses } from '@/features/courses/public/api'

import CourseCard from '@/features/courses/public/components/CourseCard.vue'

const { wording } = useTenantWording()
const courses = ref<Course[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const hasCourses = computed(() => courses.value.length > 0)
const courseWording = computed(() => wording.value.courses)

async function fetchCourses() {
  isLoading.value = true
  errorMessage.value = null

  try {
    courses.value = await loadPublicCourses()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = courseWording.value.unavailableState
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : courseWording.value.errorState
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
  <section class="space-y-6">
    <article class="rounded-3xl border border-white/10 bg-white/6 p-6">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-400">{{ courseWording.sharedEyebrow }}</p>
      <h2 class="mt-2 text-2xl font-semibold text-white">{{ courseWording.publicTitle }}</h2>
      <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
        {{ courseWording.publicDescription }}
      </p>
    </article>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      {{ courseWording.loadingState }}
    </article>

    <article
      v-else-if="errorMessage"
      class="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-sm text-rose-100"
    >
      {{ errorMessage }}
    </article>

    <article
      v-else-if="!hasCourses"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      {{ courseWording.emptyState }}
    </article>

    <div v-else class="grid gap-4">
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </div>
  </section>
</template>
