import TeamOverview from '#features/teams/models/team_overview'

export default class TeamsPublicController {
  async index() {
    return TeamOverview.query().orderBy('teamName')
  }
}
