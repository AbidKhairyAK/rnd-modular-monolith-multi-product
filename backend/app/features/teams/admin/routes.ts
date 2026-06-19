import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import TeamsAdminController from '#features/teams/admin/teams_admin_controller'

export function registerTeamsAdminRoutes() {
  router
    .get('teams', [TeamsAdminController, 'index'])
    .use(middleware.feature({ feature: 'teams' }))
}
