import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SchoolClass extends BaseModel {
  static table = 'classes'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column({ columnName: 'homeroom_teacher' })
  declare homeroomTeacher: string

  @column()
  declare students: number

  @column()
  declare schedule: string

  @column()
  declare status: 'Active' | 'Draft' | 'Needs Review'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
