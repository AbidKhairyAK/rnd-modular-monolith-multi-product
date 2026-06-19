import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class GuardianContact extends BaseModel {
  static table = 'guardians'

  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'student_name' })
  declare studentName: string

  @column({ columnName: 'guardian_name' })
  declare guardianName: string

  @column()
  declare relation: string

  @column()
  declare phone: string

  @column()
  declare email: string

  @column()
  declare status: 'Active' | 'Needs Review' | 'Inactive'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
