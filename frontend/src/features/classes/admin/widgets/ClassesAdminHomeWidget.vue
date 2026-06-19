<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { BackendApiError } from '@/app/api/backend'
import type { ClassAdminRow } from '@/core/types'
import { loadAdminClasses } from '@/features/classes/admin/api'

const classRows = ref<ClassAdminRow[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const totalClasses = computed(() => classRows.value.length)
const needsReview = computed(() =>
  classRows.value.filter((row) => row.status === 'Needs Review').length
)

async function fetchClasses() {
  isLoading.value = true
  errorMessage.value = null

  try {
    classRows.value = await loadAdminClasses()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Classes admin unavailable.'
    } else {
      errorMessage.value = error instanceof Error ? error.message : 'Unable to load class operations.'
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
  <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <p class="text-sm uppercase tracking-[0.2em] text-slate-500">School widget</p>
    <h3 class="mt-3 text-xl font-semibold text-slate-950">Class operations</h3>
    <div
      v-if="isLoading"
      class="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
    >
      Loading class operations...
    </div>
    <div
      v-else-if="errorMessage"
      class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
    >
      {{ errorMessage }}
    </div>
    <div v-else class="mt-4 grid gap-3 sm:grid-cols-2">
      <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Classes tracked</p>
        <p class="mt-2 text-2xl font-semibold text-slate-950">{{ totalClasses }}</p>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Needs review</p>
        <p class="mt-2 text-2xl font-semibold text-slate-950">{{ needsReview }}</p>
      </div>
    </div>
    <p class="mt-4 text-sm leading-6 text-slate-600">
      Product-specific admin widgets can attach to a shared admin page while staying owned by the
      feature itself.
    </p>
    <RouterLink
      to="/admin/classes"
      class="mt-5 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
    >
      Open Class Operations
    </RouterLink>
  </article>
</template>
