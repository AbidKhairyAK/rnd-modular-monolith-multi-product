import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Course extends BaseModel {
  static table = 'courses'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare category: string

  @column()
  declare owner: string

  @column()
  declare learners: number

  @column()
  declare progress: number

  @column()
  declare status: 'Live' | 'Draft' | 'Review'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
