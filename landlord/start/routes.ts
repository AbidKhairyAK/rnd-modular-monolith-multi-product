/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
const RuntimeConfigsController = () => import('#controllers/runtime_configs_controller')

router.get('/', [RuntimeConfigsController, 'index']).as('home')

router.post('/runtime-config', [RuntimeConfigsController, 'update']).as('runtime_config.update')

router.get('/api/v1/runtime-config', [RuntimeConfigsController, 'show']).as('runtime_config.show')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())
