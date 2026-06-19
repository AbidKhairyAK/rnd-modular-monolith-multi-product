import type { ProductUiManifest } from '@/core/types'

const sharedTheme = {
  shell: 'bg-slate-950 text-slate-100',
  panel: 'bg-white/7',
  panelAlt: 'bg-slate-900/70',
  border: 'border-white/10',
}

export const schoolProductManifest: ProductUiManifest = {
  key: 'school',
  label: 'School LMS',
  audience: 'K-12 learning operations',
  heroTitle: 'A shared LMS shell tuned for classroom learning',
  heroDescription:
    'Public learning flows stay consistent, while school-only capabilities appear when the active tenant enables them.',
  theme: {
    ...sharedTheme,
    accent: 'from-sky-400 via-cyan-300 to-emerald-300',
    accentSoft: 'bg-sky-400/15',
    textAccent: 'text-sky-200',
    button: 'bg-sky-300 text-slate-950 hover:bg-sky-200',
  },
  labels: {
    learner: 'Student',
    instructor: 'Teacher',
  },
}
