<script setup lang="ts">
import { computed } from 'vue'

import { useTenantWording } from '@/app/wording/useTenantWording'
import type { Course } from '@/core/types'

defineProps<{
  course: Course
}>()

const { product, wording } = useTenantWording()
const courseWording = computed(() => wording.value.courses)
</script>

<template>
  <article class="rounded-3xl border border-white/10 bg-white/6 p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm text-slate-400">{{ course.category }}</p>
        <h3 class="mt-1 text-xl font-semibold text-white">{{ course.title }}</h3>
      </div>

      <span
        class="rounded-full px-3 py-1 text-xs font-medium"
        :class="[product.theme.accentSoft, product.theme.textAccent]"
      >
        {{ course.status }}
      </span>
    </div>

    <div class="mt-5 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
      <div>
        <p class="text-slate-400">{{ courseWording.ownerLabel }}</p>
        <p class="mt-1 font-medium text-white">{{ course.owner }}</p>
      </div>
      <div>
        <p class="text-slate-400">{{ courseWording.participantLabel }}</p>
        <p class="mt-1 font-medium text-white">{{ course.learners }}</p>
      </div>
      <div>
        <p class="text-slate-400">{{ courseWording.progressLabel }}</p>
        <p class="mt-1 font-medium text-white">{{ course.progress }}%</p>
      </div>
    </div>

    <div class="mt-5 h-2 rounded-full bg-white/10">
      <div
        class="h-2 rounded-full bg-linear-to-r"
        :class="product.theme.accent"
        :style="{ width: `${course.progress}%` }"
      />
    </div>
  </article>
</template>
