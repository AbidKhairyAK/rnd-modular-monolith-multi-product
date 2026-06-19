import vine from '@vinejs/vine'

import { FEATURE_OPTIONS, PRODUCT_OPTIONS } from '@rnd/catalog'

export const runtimeConfigValidator = vine.create({
  productKey: vine.string().trim().in(PRODUCT_OPTIONS),
  enabledFeatures: vine.array(vine.string().trim().in(FEATURE_OPTIONS)).optional(),
})
