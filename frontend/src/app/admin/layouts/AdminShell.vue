<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { getRuntimeState } from '@/app/bootstrap/runtime'

const runtime = getRuntimeState()
const product = runtime.product
const adminNav = [
  ...runtime.sharedFeatures.flatMap((feature) => feature.surfaces.admin?.navItems ?? []),
  ...runtime.enabledFeatures.flatMap((feature) => feature.surfaces.admin?.navItems ?? []),
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-950">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div>
          <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Admin Surface</p>
          <h1 class="mt-2 text-2xl font-semibold">{{ product.label }}</h1>
        </div>

        <RouterLink to="/" class="rounded-full bg-slate-950 px-4 py-2 text-sm text-white">
          Back To Public
        </RouterLink>
      </div>
    </header>

    <div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:flex-row">
      <aside class="w-full shrink-0 lg:w-72">
        <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Admin Navigation</p>
          <nav class="mt-5 space-y-3">
            <RouterLink
              to="/admin"
              class="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-100"
              active-class="border-slate-950 bg-slate-950 text-white"
            >
              <span class="block text-sm font-semibold">Overview</span>
              <span class="mt-1 block text-sm text-slate-500">Surface foundation and shared tools</span>
            </RouterLink>

            <RouterLink
              v-for="item in adminNav"
              :key="item.to"
              :to="item.to"
              class="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-slate-300 hover:bg-slate-100"
              active-class="border-slate-950 bg-slate-950 text-white"
            >
              <span class="block text-sm font-semibold">{{ item.label }}</span>
              <span class="mt-1 block text-sm text-slate-500">{{ item.description }}</span>
            </RouterLink>
          </nav>
        </div>
      </aside>

      <main class="min-w-0 flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>
