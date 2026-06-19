<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import type { ClassOverview } from '@/core/types'
import { loadPublicClasses } from '@/features/classes/public/api'

const schoolClasses = ref<ClassOverview[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

async function fetchClasses() {
  isLoading.value = true
  errorMessage.value = null

  try {
    schoolClasses.value = await loadPublicClasses()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Classes are not available for the current runtime config.'
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load classes from backend.'
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
    <article class="rounded-3xl border border-white/10 bg-white/6 p-6">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-400">School Public Feature</p>
      <h2 class="mt-2 text-2xl font-semibold text-white">Classes</h2>
      <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
        This route exists only when landlord activates the school product with the `classes`
        feature enabled. The data is still hardcoded for this stage.
      </p>
    </article>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      Loading classes from backend...
    </article>

    <article
      v-else-if="errorMessage"
      class="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-sm text-rose-100"
    >
      {{ errorMessage }}
    </article>

    <article
      v-else-if="schoolClasses.length === 0"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      No classes are available yet.
    </article>

    <div v-else class="grid gap-4 md:grid-cols-3">
      <article
        v-for="classroom in schoolClasses"
        :key="classroom.id"
        class="rounded-3xl border border-white/10 bg-white/6 p-5"
      >
        <p class="text-sm text-slate-400">{{ classroom.schedule }}</p>
        <h3 class="mt-2 text-xl font-semibold text-white">{{ classroom.name }}</h3>
        <dl class="mt-4 space-y-2 text-sm text-slate-300">
          <div class="flex justify-between gap-4">
            <dt>Homeroom</dt>
            <dd class="font-medium text-white">{{ classroom.homeroomTeacher }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt>Students</dt>
            <dd class="font-medium text-white">{{ classroom.students }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>
