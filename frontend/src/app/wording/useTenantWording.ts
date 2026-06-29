import { computed } from 'vue'

import { getRuntimeState } from '@/app/bootstrap/runtime'

export function useTenantWording() {
  const runtime = getRuntimeState()

  return {
    product: computed(() => runtime.product),
    wording: computed(() => runtime.product.wording),
    isSchool: computed(() => runtime.config.productKey === 'school'),
    isCorporate: computed(() => runtime.config.productKey === 'corporate'),
  }
}
