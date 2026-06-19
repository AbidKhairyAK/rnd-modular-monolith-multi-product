<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import { Form } from '@adonisjs/inertia/vue'

type CatalogProductKey = 'school' | 'corporate'
type CatalogFeatureKey = 'classes' | 'guardians' | 'compliance' | 'teams'

type RuntimeConfig = {
  productKey: CatalogProductKey
  enabledFeatures: CatalogFeatureKey[]
}

type ProductOption = {
  key: CatalogProductKey
  label: string
  supportedFeatureKeys: CatalogFeatureKey[]
}

type FeatureOption = {
  key: CatalogFeatureKey
  label: string
  description: string
  supportedProductKeys: CatalogProductKey[]
}

const props = defineProps<{
  runtimeConfig: RuntimeConfig
  products: ProductOption[]
  features: FeatureOption[]
}>()

const selectedProduct = ref<CatalogProductKey>(props.runtimeConfig.productKey)

const activeProduct = computed(
  () => props.products.find((product) => product.key === selectedProduct.value) ?? props.products[0],
)

function isFeatureSupported(feature: FeatureOption) {
  return feature.supportedProductKeys.includes(selectedProduct.value)
}
</script>

<template>
  <Head title="Tenant Settings" />

  <div class="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
    <section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Landlord v2</p>
      <h1 class="mt-3 text-3xl font-semibold text-slate-950">Tenant runtime config</h1>
      <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
        This single-tenant landlord controls which LMS product is active and which product-specific
        features are enabled. All options come from the shared catalog package.
      </p>
    </section>

    <section class="grid gap-4 md:grid-cols-2">
      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Active product</p>
        <h2 class="mt-3 text-2xl font-semibold text-slate-950">{{ props.runtimeConfig.productKey }}</h2>
        <p class="mt-2 text-sm text-slate-600">
          {{ props.products.find((product) => product.key === props.runtimeConfig.productKey)?.label }}
        </p>
      </article>

      <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Enabled features</p>
        <ul class="mt-4 flex flex-wrap gap-2">
          <li
            v-for="featureKey in props.runtimeConfig.enabledFeatures"
            :key="featureKey"
            class="rounded-full bg-slate-950 px-3 py-1 text-sm text-white"
          >
            {{ props.features.find((feature) => feature.key === featureKey)?.label ?? featureKey }}
          </li>
        </ul>
      </article>
    </section>

    <section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="max-w-3xl">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Settings</p>
        <h2 class="mt-3 text-2xl font-semibold text-slate-950">Update tenant runtime config</h2>
        <p class="mt-3 text-sm leading-6 text-slate-600">
          Choose one product and enable only the features supported by that product. Incompatible
          features are disabled before submission and rejected again on the server.
        </p>
      </div>

      <Form
        v-slot="{ processing, errors }"
        :action="{ url: '/runtime-config', method: 'post' }"
        class="mt-8 space-y-8"
      >
        <fieldset class="space-y-4">
          <legend class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Product
          </legend>

          <div class="grid gap-4 md:grid-cols-2">
            <label
              v-for="product in props.products"
              :key="product.key"
              class="flex cursor-pointer flex-col rounded-2xl border border-slate-200 p-5 transition hover:border-slate-300"
              :class="selectedProduct === product.key ? 'border-slate-950 bg-slate-950 text-white' : 'bg-slate-50 text-slate-950'"
            >
              <input
                v-model="selectedProduct"
                type="radio"
                name="productKey"
                class="sr-only"
                :value="product.key"
              />
              <span class="text-lg font-semibold">{{ product.label }}</span>
              <span
                class="mt-2 text-sm"
                :class="selectedProduct === product.key ? 'text-slate-200' : 'text-slate-600'"
              >
                Supports {{ product.supportedFeatureKeys.length }} feature(s)
              </span>
            </label>
          </div>

          <p v-if="errors.productKey" class="text-sm text-rose-600">{{ errors.productKey }}</p>
        </fieldset>

        <fieldset class="space-y-4">
          <legend class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Features
          </legend>

          <div class="grid gap-4 md:grid-cols-2">
            <label
              v-for="feature in props.features"
              :key="feature.key"
              class="flex rounded-2xl border border-slate-200 p-5"
              :class="isFeatureSupported(feature) ? 'bg-white text-slate-950' : 'bg-slate-100 text-slate-400'"
            >
              <input
                type="checkbox"
                name="enabledFeatures[]"
                class="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950"
                :value="feature.key"
                :checked="props.runtimeConfig.enabledFeatures.includes(feature.key)"
                :disabled="!isFeatureSupported(feature)"
              />

              <span class="ml-3 block">
                <span class="block text-sm font-semibold">{{ feature.label }}</span>
                <span class="mt-1 block text-sm leading-6">
                  {{ feature.description }}
                </span>
              </span>
            </label>
          </div>

          <p v-if="errors.enabledFeatures" class="text-sm text-rose-600">
            {{ errors.enabledFeatures }}
          </p>
          <p class="text-sm text-slate-500">
            Selected product: <span class="font-medium text-slate-900">{{ activeProduct?.label }}</span>
          </p>
        </fieldset>

        <div class="flex items-center justify-between gap-4">
          <div class="text-sm text-slate-500">Public API: <code>/api/v1/runtime-config</code></div>
          <button
            type="submit"
            class="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="processing"
          >
            {{ processing ? 'Saving...' : 'Save config' }}
          </button>
        </div>
      </Form>
    </section>
  </div>
</template>
