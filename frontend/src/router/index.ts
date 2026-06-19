import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { getRuntimeState } from '@/app/bootstrap/runtime'
import AdminShell from '@/app/admin/layouts/AdminShell.vue'
import AdminHomePage from '@/app/admin/pages/AdminHomePage.vue'
import PublicShell from '@/app/public/layouts/PublicShell.vue'
import PublicHomePage from '@/app/public/pages/PublicHomePage.vue'
import type { AppRuntimeState } from '@/core/types'

function buildPublicRoutes(runtime: AppRuntimeState): RouteRecordRaw[] {
  return [
    {
      path: '/',
      component: PublicShell,
      children: [
        {
          path: '',
          name: 'public-home',
          component: PublicHomePage,
          meta: {
            surface: 'public',
            title: 'Home',
          },
        },
        ...runtime.sharedFeatures.flatMap((feature) => feature.surfaces.public?.routes ?? []),
        ...runtime.enabledFeatures.flatMap((feature) => feature.surfaces.public?.routes ?? []),
      ],
    },
  ]
}

function buildAdminRoutes(runtime: AppRuntimeState): RouteRecordRaw[] {
  return [
    {
      path: '/admin',
      component: AdminShell,
      children: [
        {
          path: '',
          name: 'admin-home',
          component: AdminHomePage,
          meta: {
            surface: 'admin',
            title: 'Admin',
          },
        },
        ...runtime.sharedFeatures.flatMap((feature) => feature.surfaces.admin?.routes ?? []),
        ...runtime.enabledFeatures.flatMap((feature) => feature.surfaces.admin?.routes ?? []),
      ],
    },
  ]
}

export function createAppRouter(runtime: AppRuntimeState) {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      ...buildPublicRoutes(runtime),
      ...buildAdminRoutes(runtime),
      {
        path: '/:pathMatch(.*)*',
        redirect: '/',
      },
    ],
  })

  router.afterEach((to) => {
    const title = typeof to.meta.title === 'string' ? to.meta.title : 'LMS'
    document.title = `${title} - ${getRuntimeState().product.label}`
  })

  return router
}
