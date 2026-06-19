<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import { getCurrentProduct } from '@/app/bootstrap/runtime'
import type { Course } from '@/core/types'
import { loadAdminCourses } from '@/features/courses/admin/api'

const product = getCurrentProduct()
const courseAdminRows = ref<Course[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const liveCount = computed(() => courseAdminRows.value.filter((course) => course.status === 'Live').length)
const reviewCount = computed(() => courseAdminRows.value.filter((course) => course.status !== 'Live').length)

async function fetchCourses() {
  isLoading.value = true
  errorMessage.value = null

  try {
    courseAdminRows.value = await loadAdminCourses()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Courses admin is currently unavailable for this surface.'
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load course management data.'
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
    <article class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Shared Admin Feature</p>
      <h2 class="mt-3 text-3xl font-semibold text-slate-950">Course management</h2>
      <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
        This admin view belongs to the same `courses` feature as the public catalog, but exposes a
        different surface for operational review and publishing decisions.
      </p>
    </article>

    <div class="grid gap-4 md:grid-cols-3">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Product</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ product.label }}</h3>
        <p class="mt-2 text-sm text-slate-600">{{ product.audience }}</p>
      </article>

      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Live</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ liveCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Courses currently visible to learners.</p>
      </article>

      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Needs review</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ reviewCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Draft or review items queued for operations.</p>
      </article>
    </div>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm"
    >
      Loading course management data from backend...
    </article>

    <article
      v-else-if="errorMessage"
      class="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm"
    >
      {{ errorMessage }}
    </article>

    <section class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <template v-if="!isLoading && !errorMessage">
      <div class="border-b border-slate-200 px-6 py-5">
        <h3 class="text-lg font-semibold text-slate-950">Catalog overview</h3>
        <p class="mt-1 text-sm text-slate-600">
          Live admin data loaded from backend.
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead class="bg-slate-50 text-slate-500">
            <tr>
              <th class="px-6 py-4 font-medium">Course</th>
              <th class="px-6 py-4 font-medium">Owner</th>
              <th class="px-6 py-4 font-medium">Learners</th>
              <th class="px-6 py-4 font-medium">Progress</th>
              <th class="px-6 py-4 font-medium">Status</th>
              <th class="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-200">
            <tr v-for="course in courseAdminRows" :key="course.id" class="align-top">
              <td class="px-6 py-5">
                <p class="font-semibold text-slate-950">{{ course.title }}</p>
                <p class="mt-1 text-slate-500">{{ course.category }}</p>
              </td>
              <td class="px-6 py-5 text-slate-700">{{ course.owner }}</td>
              <td class="px-6 py-5 text-slate-700">{{ course.learners }}</td>
              <td class="px-6 py-5 text-slate-700">{{ course.progress }}%</td>
              <td class="px-6 py-5">
                <span
                  class="rounded-full px-3 py-1 text-xs font-medium"
                  :class="{
                    'bg-emerald-100 text-emerald-700': course.status === 'Live',
                    'bg-amber-100 text-amber-700': course.status === 'Draft',
                    'bg-sky-100 text-sky-700': course.status === 'Review',
                  }"
                >
                  {{ course.status }}
                </span>
              </td>
              <td class="px-6 py-5">
                <div class="flex flex-wrap gap-2">
                  <button
                    type="button"
                    class="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    class="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </template>
    </section>
  </section>
</template>
