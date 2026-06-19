<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import type { TeamOverview } from '@/core/types'
import { loadAdminTeams } from '@/features/teams/admin/api'

const teams = ref<TeamOverview[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const onTrackCount = computed(() => teams.value.filter((item) => item.status === 'On Track').length)
const attentionCount = computed(() =>
  teams.value.filter((item) => item.status === 'Needs Attention').length
)
const riskCount = computed(() => teams.value.filter((item) => item.status === 'At Risk').length)

async function fetchTeams() {
  isLoading.value = true
  errorMessage.value = null

  try {
    teams.value = await loadAdminTeams()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Teams admin is not available for the current runtime config.'
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load team oversight from backend.'
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
    <article class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Corporate Admin Feature</p>
      <h2 class="mt-3 text-3xl font-semibold text-slate-950">Team oversight operations</h2>
      <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
        This admin route is product-specific. It is only present when the active runtime config
        resolves to `corporate` with the `teams` feature enabled.
      </p>
    </article>

    <div class="grid gap-4 md:grid-cols-3">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">On track</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ onTrackCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Teams progressing well against learning targets.</p>
      </article>
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Needs attention</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ attentionCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Teams with progress that needs manager follow-up.</p>
      </article>
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">At risk</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ riskCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Teams at risk of missing current enablement goals.</p>
      </article>
    </div>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm"
    >
      Loading team oversight from backend...
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
          <h3 class="text-lg font-semibold text-slate-950">Team oversight board</h3>
          <p class="mt-1 text-sm text-slate-600">Live admin data loaded from backend.</p>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="px-6 py-4 font-medium">Team</th>
                <th class="px-6 py-4 font-medium">Manager</th>
                <th class="px-6 py-4 font-medium">Members</th>
                <th class="px-6 py-4 font-medium">Focus area</th>
                <th class="px-6 py-4 font-medium">Progress</th>
                <th class="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="team in teams" :key="team.id">
                <td class="px-6 py-5"><p class="font-semibold text-slate-950">{{ team.teamName }}</p></td>
                <td class="px-6 py-5 text-slate-700">{{ team.managerName }}</td>
                <td class="px-6 py-5 text-slate-700">{{ team.memberCount }}</td>
                <td class="px-6 py-5 text-slate-700">{{ team.focusArea }}</td>
                <td class="px-6 py-5 text-slate-700">{{ team.progress }}%</td>
                <td class="px-6 py-5">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-medium"
                    :class="{
                      'bg-emerald-100 text-emerald-700': team.status === 'On Track',
                      'bg-amber-100 text-amber-700': team.status === 'Needs Attention',
                      'bg-rose-100 text-rose-700': team.status === 'At Risk',
                    }"
                  >
                    {{ team.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </section>
  </section>
</template>
