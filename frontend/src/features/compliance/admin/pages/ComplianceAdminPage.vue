<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import type { ComplianceRecord } from '@/core/types'
import { loadAdminCompliance } from '@/features/compliance/admin/api'

const records = ref<ComplianceRecord[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const completedCount = computed(() => records.value.filter((item) => item.status === 'Completed').length)
const dueSoonCount = computed(() => records.value.filter((item) => item.status === 'Due Soon').length)
const overdueCount = computed(() => records.value.filter((item) => item.status === 'Overdue').length)

async function fetchCompliance() {
  isLoading.value = true
  errorMessage.value = null

  try {
    records.value = await loadAdminCompliance()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Compliance admin is not available for the current runtime config.'
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load compliance operations from backend.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void fetchCompliance()
})
</script>

<template>
  <section class="space-y-6">
    <article class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Corporate Admin Feature</p>
      <h2 class="mt-3 text-3xl font-semibold text-slate-950">Compliance operations</h2>
      <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
        This admin route is product-specific. It is only present when the active runtime config
        resolves to `corporate` with the `compliance` feature enabled.
      </p>
    </article>

    <div class="grid gap-4 md:grid-cols-3">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Completed</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ completedCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Training items already completed.</p>
      </article>
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Due soon</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ dueSoonCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Training items approaching their due date.</p>
      </article>
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Overdue</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ overdueCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Items that need immediate operational follow-up.</p>
      </article>
    </div>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm"
    >
      Loading compliance operations from backend...
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
          <h3 class="text-lg font-semibold text-slate-950">Compliance board</h3>
          <p class="mt-1 text-sm text-slate-600">Live admin data loaded from backend.</p>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="px-6 py-4 font-medium">Employee</th>
                <th class="px-6 py-4 font-medium">Module</th>
                <th class="px-6 py-4 font-medium">Due date</th>
                <th class="px-6 py-4 font-medium">Completion</th>
                <th class="px-6 py-4 font-medium">Status</th>
                <th class="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="record in records" :key="record.id">
                <td class="px-6 py-5"><p class="font-semibold text-slate-950">{{ record.employeeName }}</p></td>
                <td class="px-6 py-5 text-slate-700">{{ record.moduleName }}</td>
                <td class="px-6 py-5 text-slate-700">{{ record.dueDate }}</td>
                <td class="px-6 py-5 text-slate-700">{{ record.completion }}%</td>
                <td class="px-6 py-5">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-medium"
                    :class="{
                      'bg-emerald-100 text-emerald-700': record.status === 'Completed',
                      'bg-amber-100 text-amber-700': record.status === 'Due Soon',
                      'bg-rose-100 text-rose-700': record.status === 'Overdue',
                    }"
                  >
                    {{ record.status }}
                  </span>
                </td>
                <td class="px-6 py-5">
                  <div class="flex flex-wrap gap-2">
                    <button type="button" class="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700">View</button>
                    <button type="button" class="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700">Remind</button>
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
