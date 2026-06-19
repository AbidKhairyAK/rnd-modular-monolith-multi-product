<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import type { GuardianContact } from '@/core/types'
import { loadPublicGuardians } from '@/features/guardians/public/api'

const guardians = ref<GuardianContact[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

async function fetchGuardians() {
  isLoading.value = true
  errorMessage.value = null

  try {
    guardians.value = await loadPublicGuardians()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Guardians are not available for the current runtime config.'
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load guardians from backend.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void fetchGuardians()
})
</script>

<template>
  <section class="space-y-6">
    <article class="rounded-3xl border border-white/10 bg-white/6 p-6">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-400">School Public Feature</p>
      <h2 class="mt-2 text-2xl font-semibold text-white">Guardians</h2>
      <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
        This route provides a school-facing guardian contact directory for student support and
        parent communication.
      </p>
    </article>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      Loading guardian contacts from backend...
    </article>

    <article
      v-else-if="errorMessage"
      class="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-sm text-rose-100"
    >
      {{ errorMessage }}
    </article>

    <article
      v-else-if="guardians.length === 0"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      No guardian contacts are available yet.
    </article>

    <div v-else class="grid gap-4 md:grid-cols-2">
      <article
        v-for="guardian in guardians"
        :key="guardian.id"
        class="rounded-3xl border border-white/10 bg-white/6 p-5"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm text-slate-400">{{ guardian.relation }}</p>
            <h3 class="mt-1 text-xl font-semibold text-white">{{ guardian.guardianName }}</h3>
            <p class="mt-1 text-sm text-slate-300">Student: {{ guardian.studentName }}</p>
          </div>

          <span
            class="rounded-full px-3 py-1 text-xs font-medium"
            :class="{
              'bg-emerald-400/20 text-emerald-200': guardian.status === 'Active',
              'bg-amber-400/20 text-amber-200': guardian.status === 'Needs Review',
              'bg-slate-400/20 text-slate-200': guardian.status === 'Inactive',
            }"
          >
            {{ guardian.status }}
          </span>
        </div>

        <dl class="mt-5 space-y-2 text-sm text-slate-300">
          <div class="flex justify-between gap-4">
            <dt>Phone</dt>
            <dd class="font-medium text-white">{{ guardian.phone }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt>Email</dt>
            <dd class="font-medium text-white">{{ guardian.email }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>
