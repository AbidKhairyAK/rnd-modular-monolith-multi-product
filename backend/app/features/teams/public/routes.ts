import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import TeamsPublicController from '#features/teams/public/teams_public_controller'

export function registerTeamsPublicRoutes() {
  router
    .get('teams', [TeamsPublicController, 'index'])
    .use(middleware.feature({ feature: 'teams' }))
}
