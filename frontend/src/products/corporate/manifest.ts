import type { ProductUiManifest } from '@/core/types'
import { corporateProductWording } from '@/app/wording/product-wording'

const sharedTheme = {
  shell: 'bg-slate-950 text-slate-100',
  panel: 'bg-white/7',
  panelAlt: 'bg-slate-900/70',
  border: 'border-white/10',
}

export const corporateProductManifest: ProductUiManifest = {
  key: 'corporate',
  label: 'Corporate LMS',
  audience: 'Workforce learning operations',
  heroTitle: 'A shared LMS shell tuned for employee enablement',
  heroDescription:
    'The same frontend foundation can serve corporate learning programs while feature availability stays runtime-driven.',
  theme: {
    ...sharedTheme,
    accent: 'from-amber-300 via-orange-300 to-rose-300',
    accentSoft: 'bg-amber-300/15',
    textAccent: 'text-amber-200',
    button: 'bg-amber-300 text-slate-950 hover:bg-amber-200',
  },
  labels: {
    learner: 'Employee',
    instructor: 'Trainer',
  },
  wording: corporateProductWording,
}
