<script setup lang="ts">
import { getRuntimeState } from '@/app/bootstrap/runtime'

const runtime = getRuntimeState()
const product = runtime.product
const homeWidgets = runtime.widgets.publicHomeMain

const visibleFeatures = runtime.enabledFeatures.flatMap((feature) => feature.surfaces.public?.navItems ?? [])
</script>

<template>
  <section class="space-y-6">
    <article :class="['rounded-3xl border p-8', product.theme.panel, product.theme.border]">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Public Surface</p>
      <h2 class="mt-3 text-3xl font-semibold text-white">{{ product.label }}</h2>
      <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
        Runtime config from landlord decides the active product and which product-specific public
        features are available. Shared features remain visible across products.
      </p>
    </article>

    <div class="grid gap-4 md:grid-cols-2">
      <article class="rounded-3xl border border-white/10 bg-white/6 p-6">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Shared capability</p>
        <h3 class="mt-3 text-xl font-semibold text-white">Courses</h3>
        <p class="mt-3 text-sm leading-6 text-slate-300">
          This feature stays available for all products and demonstrates a shared public route.
        </p>
      </article>

      <article class="rounded-3xl border border-white/10 bg-white/6 p-6">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Runtime features</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-200">
          <li
            v-for="item in visibleFeatures"
            :key="item.to"
            class="rounded-2xl bg-white/6 px-4 py-3"
          >
            {{ item.label }}
          </li>
          <li v-if="visibleFeatures.length === 0" class="rounded-2xl bg-white/6 px-4 py-3 text-slate-400">
            No product-specific public features enabled.
          </li>
        </ul>
      </article>
    </div>

    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-white">Feature widgets</h3>
        <p class="text-sm text-slate-400">Contributed by active features</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <component
          :is="widget.component"
          v-for="widget in homeWidgets"
          :key="widget.id"
        />
      </div>
    </section>
  </section>
</template>
