import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ComplianceRecord extends BaseModel {
  static table = 'compliance'

  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'employee_name' })
  declare employeeName: string

  @column({ columnName: 'module_name' })
  declare moduleName: string

  @column({ columnName: 'due_date' })
  declare dueDate: string

  @column()
  declare completion: number

  @column()
  declare status: 'Completed' | 'Due Soon' | 'Overdue'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
