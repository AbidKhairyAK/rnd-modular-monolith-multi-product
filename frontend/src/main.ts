import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { bootstrapRuntime } from '@/app/bootstrap/runtime'
import { createAppRouter } from '@/router'
import '@/main.css'

function renderStartupState(markup: string) {
  const target = document.querySelector('#app')
  if (!target) {
    throw new Error('Unable to find #app mount target.')
  }

  target.innerHTML = markup
}

async function bootstrap() {
  renderStartupState(`
    <main class="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div class="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/6 p-8">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Frontend v2</p>
        <h1 class="mt-3 text-3xl font-semibold">Loading runtime config...</h1>
        <p class="mt-4 text-sm leading-6 text-slate-300">
          The app is waiting for landlord runtime config before mounting the public and admin surfaces.
        </p>
      </div>
    </main>
  `)

  try {
    const runtime = await bootstrapRuntime()
    const app = createApp(App)
    const router = createAppRouter(runtime)

    app.use(createPinia())
    app.use(router)
    app.mount('#app')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown startup error.'
    renderStartupState(`
      <main class="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
        <div class="mx-auto max-w-3xl rounded-3xl border border-rose-400/20 bg-rose-400/10 p-8">
          <p class="text-sm uppercase tracking-[0.2em] text-rose-200">Frontend v2</p>
          <h1 class="mt-3 text-3xl font-semibold text-white">Unable to start the app</h1>
          <p class="mt-4 text-sm leading-6 text-rose-100">${message}</p>
        </div>
      </main>
    `)
  }
}

void bootstrap()
