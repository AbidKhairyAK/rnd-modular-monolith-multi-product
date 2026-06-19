import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TeamOverview extends BaseModel {
  static table = 'teams'

  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'team_name' })
  declare teamName: string

  @column({ columnName: 'manager_name' })
  declare managerName: string

  @column({ columnName: 'member_count' })
  declare memberCount: number

  @column({ columnName: 'focus_area' })
  declare focusArea: string

  @column()
  declare progress: number

  @column()
  declare status: 'On Track' | 'Needs Attention' | 'At Risk'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
