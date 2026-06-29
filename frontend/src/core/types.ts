import type { FeatureKey as CatalogFeatureKey, ProductKey as CatalogProductKey } from '@rnd/catalog'
import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export type { CatalogFeatureKey, CatalogProductKey }

export type AppSurface = 'public' | 'admin'

export type RuntimeConfig = {
  productKey: CatalogProductKey
  enabledFeatures: CatalogFeatureKey[]
}

export type ProductUiManifest = {
  key: CatalogProductKey
  label: string
  audience: string
  heroTitle: string
  heroDescription: string
  theme: {
    shell: string
    panel: string
    panelAlt: string
    border: string
    accent: string
    accentSoft: string
    textAccent: string
    button: string
  }
  labels: {
    learner: string
    instructor: string
  }
  wording: ProductWording
}

export type ProductWording = {
  courses: {
    sharedEyebrow: string
    publicTitle: string
    publicDescription: string
    loadingState: string
    unavailableState: string
    errorState: string
    emptyState: string
    ownerLabel: string
    participantLabel: string
    progressLabel: string
    widgetEyebrow: string
    widgetTitle: string
    widgetLoadingState: string
    widgetUnavailableState: string
    widgetErrorState: string
    widgetTotalLabel: string
    widgetParticipantsLabel: string
    widgetDescription: string
    widgetCta: string
  }
  classes: {
    publicEyebrow: string
    publicTitle: string
    publicDescription: string
    loadingState: string
    unavailableState: string
    errorState: string
    emptyState: string
    homeroomLabel: string
    participantsLabel: string
    widgetEyebrow: string
    widgetTitle: string
    widgetLoadingState: string
    widgetUnavailableState: string
    widgetErrorState: string
    widgetTotalLabel: string
    widgetParticipantsLabel: string
    widgetDescription: string
    widgetCta: string
  }
}

export type NavItem = {
  label: string
  to: string
  description: string
}

export type SharedPageSlot = 'public-home-main' | 'admin-home-main'

export type FeatureWidgetContribution = {
  id: string
  slot: SharedPageSlot
  order: number
  component: Component
}

export type FeatureSurfaceManifest = {
  routes: RouteRecordRaw[]
  navItems: NavItem[]
}

export type FrontendFeatureManifest = {
  key: CatalogFeatureKey
  surfaces: Partial<Record<AppSurface, FeatureSurfaceManifest>>
  widgets?: FeatureWidgetContribution[]
}

export type Course = {
  id: string
  title: string
  category: string
  owner: string
  learners: number
  progress: number
  status: 'Live' | 'Draft' | 'Review'
}

export type ClassOverview = {
  id: string
  name: string
  homeroomTeacher: string
  students: number
  schedule: string
}

export type ClassAdminRow = ClassOverview & {
  status: 'Active' | 'Draft' | 'Needs Review'
}

export type GuardianContact = {
  id: string
  studentName: string
  guardianName: string
  relation: string
  phone: string
  email: string
  status: 'Active' | 'Needs Review' | 'Inactive'
}

export type ComplianceRecord = {
  id: string
  employeeName: string
  moduleName: string
  dueDate: string
  completion: number
  status: 'Completed' | 'Due Soon' | 'Overdue'
}

export type TeamOverview = {
  id: string
  teamName: string
  managerName: string
  memberCount: number
  focusArea: string
  progress: number
  status: 'On Track' | 'Needs Attention' | 'At Risk'
}

export type SharedFeatureManifest = {
  surfaces: Partial<Record<AppSurface, FeatureSurfaceManifest>>
  widgets?: FeatureWidgetContribution[]
}

export type ResolvedWidgetRegistry = {
  publicHomeMain: FeatureWidgetContribution[]
  adminHomeMain: FeatureWidgetContribution[]
}

export type AppRuntimeState = {
  config: RuntimeConfig
  product: ProductUiManifest
  enabledFeatures: FrontendFeatureManifest[]
  sharedFeatures: SharedFeatureManifest[]
  widgets: ResolvedWidgetRegistry
}
