<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { BackendApiError } from '@/app/api/backend'
import { useTenantWording } from '@/app/wording/useTenantWording'
import type { ClassOverview } from '@/core/types'
import { loadPublicClasses } from '@/features/classes/public/api'

const { wording } = useTenantWording()
const schoolClasses = ref<ClassOverview[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const classWording = computed(() => wording.value.classes)
const totalClasses = computed(() => schoolClasses.value.length)
const totalStudents = computed(() =>
  schoolClasses.value.reduce((total, classroom) => total + classroom.students, 0)
)

async function fetchClasses() {
  isLoading.value = true
  errorMessage.value = null

  try {
    schoolClasses.value = await loadPublicClasses()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = classWording.value.widgetUnavailableState
    } else {
      errorMessage.value = error instanceof Error ? error.message : classWording.value.widgetErrorState
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
  <article class="rounded-3xl border border-white/10 bg-white/6 p-6">
    <p class="text-sm uppercase tracking-[0.2em] text-slate-400">{{ classWording.widgetEyebrow }}</p>
    <h3 class="mt-3 text-xl font-semibold text-white">{{ classWording.widgetTitle }}</h3>
    <div
      v-if="isLoading"
      class="mt-4 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-slate-300"
    >
      {{ classWording.widgetLoadingState }}
    </div>
    <div
      v-else-if="errorMessage"
      class="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100"
    >
      {{ errorMessage }}
    </div>
    <div v-else class="mt-4 grid gap-3 sm:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ classWording.widgetTotalLabel }}</p>
        <p class="mt-2 text-2xl font-semibold text-white">{{ totalClasses }}</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ classWording.widgetParticipantsLabel }}</p>
        <p class="mt-2 text-2xl font-semibold text-white">{{ totalStudents }}</p>
      </div>
    </div>
    <p class="mt-4 text-sm leading-6 text-slate-300">
      {{ classWording.widgetDescription }}
    </p>
    <RouterLink
      to="/classes"
      class="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:text-white"
    >
      {{ classWording.widgetCta }}
    </RouterLink>
  </article>
</template>
