import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

import type { FeatureKey as CatalogFeatureKey, ProductKey as CatalogProductKey } from '@rnd/catalog'

export default class RuntimeConfig extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productKey: CatalogProductKey

  @column({
    prepare: (value: CatalogFeatureKey[]) => JSON.stringify(value),
    consume: (value: string | CatalogFeatureKey[] | null) => {
      if (Array.isArray(value)) {
        return value
      }

      if (!value) {
        return []
      }

      return JSON.parse(value) as CatalogFeatureKey[]
    },
  })
  declare enabledFeatures: CatalogFeatureKey[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
