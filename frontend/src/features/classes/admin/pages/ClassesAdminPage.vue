<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import type { ClassAdminRow } from '@/core/types'
import { loadAdminClasses } from '@/features/classes/admin/api'

const classAdminRows = ref<ClassAdminRow[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const activeCount = computed(() => classAdminRows.value.filter((item) => item.status === 'Active').length)
const reviewCount = computed(() =>
  classAdminRows.value.filter((item) => item.status === 'Needs Review').length
)
const draftCount = computed(() => classAdminRows.value.filter((item) => item.status === 'Draft').length)

async function fetchClasses() {
  isLoading.value = true
  errorMessage.value = null

  try {
    classAdminRows.value = await loadAdminClasses()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Classes admin is not available for the current runtime config.'
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load class operations from backend.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void fetchClasses()
})
</script>

<template>
  <section class="space-y-6">
    <article class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-500">School Admin Feature</p>
      <h2 class="mt-3 text-3xl font-semibold text-slate-950">Class operations</h2>
      <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
        This admin route is product-specific. It is only present when the active runtime config
        resolves to `school` with the `classes` feature enabled.
      </p>
    </article>

    <div class="grid gap-4 md:grid-cols-3">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Active</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ activeCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Classes currently published to operations.</p>
      </article>

      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Needs review</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ reviewCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Schedules or assignments that need attention.</p>
      </article>

      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Draft</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ draftCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Classes prepared but not yet rolled out.</p>
      </article>
    </div>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm"
    >
      Loading class operations from backend...
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
        <h3 class="text-lg font-semibold text-slate-950">Class management board</h3>
        <p class="mt-1 text-sm text-slate-600">
          Live admin data loaded from backend.
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead class="bg-slate-50 text-slate-500">
            <tr>
              <th class="px-6 py-4 font-medium">Class</th>
              <th class="px-6 py-4 font-medium">Homeroom</th>
              <th class="px-6 py-4 font-medium">Students</th>
              <th class="px-6 py-4 font-medium">Schedule</th>
              <th class="px-6 py-4 font-medium">Status</th>
              <th class="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="row in classAdminRows" :key="row.id">
              <td class="px-6 py-5">
                <p class="font-semibold text-slate-950">{{ row.name }}</p>
              </td>
              <td class="px-6 py-5 text-slate-700">{{ row.homeroomTeacher }}</td>
              <td class="px-6 py-5 text-slate-700">{{ row.students }}</td>
              <td class="px-6 py-5 text-slate-700">{{ row.schedule }}</td>
              <td class="px-6 py-5">
                <span
                  class="rounded-full px-3 py-1 text-xs font-medium"
                  :class="{
                    'bg-emerald-100 text-emerald-700': row.status === 'Active',
                    'bg-amber-100 text-amber-700': row.status === 'Draft',
                    'bg-rose-100 text-rose-700': row.status === 'Needs Review',
                  }"
                >
                  {{ row.status }}
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
                  <button
                    type="button"
                    class="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    Assign teacher
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
