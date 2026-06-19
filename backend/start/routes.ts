/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import RuntimeConfigRefreshController from '#controllers/runtime_config_refresh_controller'
import { registerAdminFeatureRoutes, registerPublicFeatureRoutes } from '#services/feature_registry'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        registerPublicFeatureRoutes()
      })
      .prefix('public')
      .as('public')

    router
      .group(() => {
        registerAdminFeatureRoutes()
      })
      .prefix('admin')
      .as('admin')

    router
      .group(() => {
        router.post('runtime-config/refresh', [RuntimeConfigRefreshController, 'store'])
      })
      .prefix('internal')
      .as('internal')

    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
