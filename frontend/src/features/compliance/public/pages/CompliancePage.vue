<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import type { ComplianceRecord } from '@/core/types'
import { loadPublicCompliance } from '@/features/compliance/public/api'

const records = ref<ComplianceRecord[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

async function fetchCompliance() {
  isLoading.value = true
  errorMessage.value = null

  try {
    records.value = await loadPublicCompliance()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Compliance is not available for the current runtime config.'
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load compliance data from backend.'
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
    <article class="rounded-3xl border border-white/10 bg-white/6 p-6">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Corporate Public Feature</p>
      <h2 class="mt-2 text-2xl font-semibold text-white">Compliance</h2>
      <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
        This route provides visibility into mandatory training progress and due dates for employee
        learning programs.
      </p>
    </article>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      Loading compliance data from backend...
    </article>

    <article
      v-else-if="errorMessage"
      class="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-sm text-rose-100"
    >
      {{ errorMessage }}
    </article>

    <article
      v-else-if="records.length === 0"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      No compliance records are available yet.
    </article>

    <div v-else class="grid gap-4 md:grid-cols-2">
      <article
        v-for="record in records"
        :key="record.id"
        class="rounded-3xl border border-white/10 bg-white/6 p-5"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm text-slate-400">{{ record.employeeName }}</p>
            <h3 class="mt-1 text-xl font-semibold text-white">{{ record.moduleName }}</h3>
            <p class="mt-1 text-sm text-slate-300">Due: {{ record.dueDate }}</p>
          </div>

          <span
            class="rounded-full px-3 py-1 text-xs font-medium"
            :class="{
              'bg-emerald-400/20 text-emerald-200': record.status === 'Completed',
              'bg-amber-400/20 text-amber-200': record.status === 'Due Soon',
              'bg-rose-400/20 text-rose-200': record.status === 'Overdue',
            }"
          >
            {{ record.status }}
          </span>
        </div>

        <div class="mt-5">
          <p class="text-sm text-slate-400">Completion</p>
          <p class="mt-1 text-lg font-semibold text-white">{{ record.completion }}%</p>
          <div class="mt-3 h-2 rounded-full bg-white/10">
            <div
              class="h-2 rounded-full bg-linear-to-r from-amber-300 via-orange-300 to-rose-300"
              :style="{ width: `${record.completion}%` }"
            />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
