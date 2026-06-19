<script setup lang="ts">
import { getRuntimeState } from '@/app/bootstrap/runtime'

const runtime = getRuntimeState()
const homeWidgets = runtime.widgets.adminHomeMain
const adminFeatures = [
  ...runtime.sharedFeatures.flatMap((feature) => feature.surfaces.admin?.navItems ?? []),
  ...runtime.enabledFeatures.flatMap((feature) => feature.surfaces.admin?.navItems ?? []),
]
</script>

<template>
  <section class="space-y-6">
    <article class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Admin Surface</p>
      <h2 class="mt-3 text-3xl font-semibold text-slate-950">Admin routes are now feature-backed</h2>
      <p class="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
        The admin surface is no longer just a placeholder. Shared admin capabilities are registered
        through the same feature-centric structure as the public surface.
      </p>
    </article>

    <section class="grid gap-4 md:grid-cols-2">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Available admin features</p>
        <ul class="mt-4 space-y-3 text-sm text-slate-700">
          <li
            v-for="item in adminFeatures"
            :key="item.to"
            class="rounded-2xl bg-slate-50 px-4 py-3"
          >
            <p class="font-semibold text-slate-950">{{ item.label }}</p>
            <p class="mt-1 text-slate-500">{{ item.description }}</p>
          </li>
        </ul>
      </article>

      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Why this matters</p>
        <p class="mt-4 text-sm leading-6 text-slate-600">
          Shared features like `courses` and product-specific features like `classes` can both own
          `public` and `admin` surfaces without moving any page into `app/admin`. That keeps
          feature ownership intact while still making surface separation explicit in the router and
          layout layers.
        </p>
      </article>
    </section>

    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-slate-950">Feature widgets</h3>
        <p class="text-sm text-slate-500">Contributed by active features</p>
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
