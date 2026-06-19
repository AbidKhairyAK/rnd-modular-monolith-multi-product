<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import type { TeamOverview } from '@/core/types'
import { loadPublicTeams } from '@/features/teams/public/api'

const teams = ref<TeamOverview[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

async function fetchTeams() {
  isLoading.value = true
  errorMessage.value = null

  try {
    teams.value = await loadPublicTeams()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Teams are not available for the current runtime config.'
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load teams from backend.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void fetchTeams()
})
</script>

<template>
  <section class="space-y-6">
    <article class="rounded-3xl border border-white/10 bg-white/6 p-6">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Corporate Public Feature</p>
      <h2 class="mt-2 text-2xl font-semibold text-white">Teams</h2>
      <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
        This route provides team-level oversight for manager learning progress and focus areas.
      </p>
    </article>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      Loading teams from backend...
    </article>

    <article
      v-else-if="errorMessage"
      class="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-sm text-rose-100"
    >
      {{ errorMessage }}
    </article>

    <article
      v-else-if="teams.length === 0"
      class="rounded-3xl border border-white/10 bg-white/6 p-6 text-sm text-slate-300"
    >
      No team oversight data is available yet.
    </article>

    <div v-else class="grid gap-4 md:grid-cols-2">
      <article
        v-for="team in teams"
        :key="team.id"
        class="rounded-3xl border border-white/10 bg-white/6 p-5"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm text-slate-400">{{ team.managerName }}</p>
            <h3 class="mt-1 text-xl font-semibold text-white">{{ team.teamName }}</h3>
            <p class="mt-1 text-sm text-slate-300">Focus: {{ team.focusArea }}</p>
          </div>

          <span
            class="rounded-full px-3 py-1 text-xs font-medium"
            :class="{
              'bg-emerald-400/20 text-emerald-200': team.status === 'On Track',
              'bg-amber-400/20 text-amber-200': team.status === 'Needs Attention',
              'bg-rose-400/20 text-rose-200': team.status === 'At Risk',
            }"
          >
            {{ team.status }}
          </span>
        </div>

        <dl class="mt-5 space-y-2 text-sm text-slate-300">
          <div class="flex justify-between gap-4">
            <dt>Members</dt>
            <dd class="font-medium text-white">{{ team.memberCount }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt>Progress</dt>
            <dd class="font-medium text-white">{{ team.progress }}%</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>
