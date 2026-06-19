<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { getRuntimeState } from '@/app/bootstrap/runtime'

const runtime = getRuntimeState()
const product = runtime.product

const publicNav = [
  ...runtime.sharedFeatures.flatMap((feature) => feature.surfaces.public?.navItems ?? []),
  ...runtime.enabledFeatures.flatMap((feature) => feature.surfaces.public?.navItems ?? []),
]
</script>

<template>
  <div :class="['min-h-screen', product.theme.shell]">
    <header class="bg-slate-950/70 backdrop-blur border-white/10 border-b">
      <div class="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-5 mx-auto px-6 py-6 max-w-6xl">
        <div class="max-w-3xl">
          <p class="text-slate-400 text-sm uppercase tracking-[0.2em]">{{ product.audience }}</p>
          <h1 class="mt-3 font-semibold text-white text-3xl">{{ product.heroTitle }}</h1>
          <p class="mt-3 text-slate-300 text-sm leading-6">{{ product.heroDescription }}</p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <RouterLink
            to="/admin"
            class="px-4 py-2 border border-white/15 hover:border-white/30 rounded-full text-slate-200 hover:text-white text-sm transition"
          >
            Admin Surface
          </RouterLink>
        </div>
      </div>
    </header>

    <div class="flex lg:flex-row flex-col gap-8 mx-auto px-6 py-8 max-w-6xl">
      <aside class="w-full lg:w-72 shrink-0">
        <div :class="['rounded-3xl border p-5', product.theme.panel, product.theme.border]">
          <p class="text-slate-400 text-sm uppercase tracking-[0.2em]">Public Navigation</p>
          <nav class="space-y-3 mt-5">
            <RouterLink
              to="/"
              class="block bg-white/6 hover:bg-white/10 px-4 py-3 border border-white/8 hover:border-white/20 rounded-2xl transition"
              active-class="border-white/25 bg-white/12"
            >
              <span class="block font-semibold text-white text-sm">Homepage</span>
              <span class="block mt-1 text-slate-400 text-sm">Surface foundation and shared tools</span>
            </RouterLink>

            <RouterLink
              v-for="item in publicNav"
              :key="item.to"
              :to="item.to"
              class="block bg-white/6 hover:bg-white/10 px-4 py-3 border border-white/8 hover:border-white/20 rounded-2xl transition"
              active-class="border-white/25 bg-white/12"
            >
              <span class="block font-semibold text-white text-sm">{{ item.label }}</span>
              <span class="block mt-1 text-slate-400 text-sm">{{ item.description }}</span>
            </RouterLink>
          </nav>
        </div>
      </aside>

      <main class="flex-1 min-w-0">
        <RouterView />
      </main>
    </div>
  </div>
</template>
