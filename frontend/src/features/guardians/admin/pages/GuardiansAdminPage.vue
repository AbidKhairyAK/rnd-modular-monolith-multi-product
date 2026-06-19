<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { BackendApiError } from '@/app/api/backend'
import type { GuardianContact } from '@/core/types'
import { loadAdminGuardians } from '@/features/guardians/admin/api'

const guardians = ref<GuardianContact[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

const activeCount = computed(() => guardians.value.filter((item) => item.status === 'Active').length)
const reviewCount = computed(() =>
  guardians.value.filter((item) => item.status === 'Needs Review').length
)
const inactiveCount = computed(() =>
  guardians.value.filter((item) => item.status === 'Inactive').length
)

async function fetchGuardians() {
  isLoading.value = true
  errorMessage.value = null

  try {
    guardians.value = await loadAdminGuardians()
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 404) {
      errorMessage.value = 'Guardians admin is not available for the current runtime config.'
    } else {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load guardian operations from backend.'
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
    <article class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-500">School Admin Feature</p>
      <h2 class="mt-3 text-3xl font-semibold text-slate-950">Guardian operations</h2>
      <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
        This admin route is product-specific. It is only present when the active runtime config
        resolves to `school` with the `guardians` feature enabled.
      </p>
    </article>

    <div class="grid gap-4 md:grid-cols-3">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Active</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ activeCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Contacts ready for school communications.</p>
      </article>

      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Needs review</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ reviewCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Contacts that need verification or follow-up.</p>
      </article>

      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Inactive</p>
        <h3 class="mt-3 text-2xl font-semibold text-slate-950">{{ inactiveCount }}</h3>
        <p class="mt-2 text-sm text-slate-600">Contacts no longer used in active workflows.</p>
      </article>
    </div>

    <article
      v-if="isLoading"
      class="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm"
    >
      Loading guardian operations from backend...
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
          <h3 class="text-lg font-semibold text-slate-950">Guardian contact board</h3>
          <p class="mt-1 text-sm text-slate-600">Live admin data loaded from backend.</p>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="px-6 py-4 font-medium">Student</th>
                <th class="px-6 py-4 font-medium">Guardian</th>
                <th class="px-6 py-4 font-medium">Relation</th>
                <th class="px-6 py-4 font-medium">Phone</th>
                <th class="px-6 py-4 font-medium">Email</th>
                <th class="px-6 py-4 font-medium">Status</th>
                <th class="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="guardian in guardians" :key="guardian.id">
                <td class="px-6 py-5">
                  <p class="font-semibold text-slate-950">{{ guardian.studentName }}</p>
                </td>
                <td class="px-6 py-5 text-slate-700">{{ guardian.guardianName }}</td>
                <td class="px-6 py-5 text-slate-700">{{ guardian.relation }}</td>
                <td class="px-6 py-5 text-slate-700">{{ guardian.phone }}</td>
                <td class="px-6 py-5 text-slate-700">{{ guardian.email }}</td>
                <td class="px-6 py-5">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-medium"
                    :class="{
                      'bg-emerald-100 text-emerald-700': guardian.status === 'Active',
                      'bg-amber-100 text-amber-700': guardian.status === 'Needs Review',
                      'bg-slate-200 text-slate-700': guardian.status === 'Inactive',
                    }"
                  >
                    {{ guardian.status }}
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
                      Contact
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
