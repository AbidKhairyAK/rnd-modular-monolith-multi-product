import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { FeatureKey as CatalogFeatureKey } from '@rnd/catalog'

import { isFeatureEnabled } from '#services/runtime_config_service'

export default class FeatureEnabledMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: { feature: CatalogFeatureKey }) {
    if (isFeatureEnabled(options.feature)) {
      return next()
    }

    return ctx.response.status(404).send({
      message: `Feature "${options.feature}" is not available.`,
    })
  }
}
