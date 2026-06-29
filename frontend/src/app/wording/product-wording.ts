import type { ProductWording } from '@/core/types'

export const schoolProductWording: ProductWording = {
  courses: {
    sharedEyebrow: 'Shared Public Feature School',
    publicTitle: 'Courses',
    publicDescription:
      'This shared catalog helps teachers organize classroom learning while keeping student-facing course access consistent.',
    loadingState: 'Loading courses from backend...',
    unavailableState: 'Courses are currently unavailable for this surface.',
    errorState: 'Unable to load courses from backend.',
    emptyState: 'No courses are available for students yet.',
    ownerLabel: 'Teacher',
    participantLabel: 'Students',
    progressLabel: 'Class progress',
    widgetEyebrow: 'Shared widget',
    widgetTitle: 'Courses',
    widgetLoadingState: 'Loading course summary...',
    widgetUnavailableState: 'Courses unavailable.',
    widgetErrorState: 'Unable to load courses.',
    widgetTotalLabel: 'Total courses',
    widgetParticipantsLabel: 'Students enrolled',
    widgetDescription:
      'Shared course catalog stays available across school tenants and contributes classroom summary data to the public home.',
    widgetCta: 'Open Courses',
  },
  classes: {
    publicEyebrow: 'School Public Feature sddsd',
    publicTitle: 'Classes',
    publicDescription:
      'This school-only route helps teachers and coordinators review homerooms, schedules, and student coverage.',
    loadingState: 'Loading classes from backend...',
    unavailableState: 'Classes are not available for the current runtime config.',
    errorState: 'Unable to load classes from backend.',
    emptyState: 'No classes are available yet.',
    homeroomLabel: 'Homeroom',
    participantsLabel: 'Students',
    widgetEyebrow: 'School widget',
    widgetTitle: 'Classes',
    widgetLoadingState: 'Loading class summary...',
    widgetUnavailableState: 'Classes unavailable.',
    widgetErrorState: 'Unable to load classes.',
    widgetTotalLabel: 'Active classes',
    widgetParticipantsLabel: 'Students covered',
    widgetDescription:
      'This widget appears only when the runtime config enables the classes feature for the school product.',
    widgetCta: 'Open Classes',
  },
}

export const corporateProductWording: ProductWording = {
  courses: {
    sharedEyebrow: 'Shared Public Feature Corporate',
    publicTitle: 'Training Catalog',
    publicDescription:
      'This shared catalog helps trainers run workforce enablement programs while keeping employee-facing learning access consistent.',
    loadingState: 'Loading training catalog from backend...',
    unavailableState: 'Training catalog is currently unavailable for this surface.',
    errorState: 'Unable to load training catalog from backend.',
    emptyState: 'No training programs are available for employees yet.',
    ownerLabel: 'Trainer',
    participantLabel: 'Employees',
    progressLabel: 'Completion progress',
    widgetEyebrow: 'Shared widget',
    widgetTitle: 'Training Catalog',
    widgetLoadingState: 'Loading training summary...',
    widgetUnavailableState: 'Training catalog unavailable.',
    widgetErrorState: 'Unable to load training catalog.',
    widgetTotalLabel: 'Total programs',
    widgetParticipantsLabel: 'Employees enrolled',
    widgetDescription:
      'Shared training catalog stays available across corporate tenants and contributes workforce summary data to the public home.',
    widgetCta: 'Open Training Catalog',
  },
  classes: {
    publicEyebrow: 'Corporate Public Feature',
    publicTitle: 'Cohorts',
    publicDescription:
      'This fallback wording maps class-style grouping to corporate learning cohorts when the feature is enabled.',
    loadingState: 'Loading cohorts from backend...',
    unavailableState: 'Cohorts are not available for the current runtime config.',
    errorState: 'Unable to load cohorts from backend.',
    emptyState: 'No cohorts are available yet.',
    homeroomLabel: 'Cohort lead',
    participantsLabel: 'Employees',
    widgetEyebrow: 'Corporate widget',
    widgetTitle: 'Cohorts',
    widgetLoadingState: 'Loading cohort summary...',
    widgetUnavailableState: 'Cohorts unavailable.',
    widgetErrorState: 'Unable to load cohorts.',
    widgetTotalLabel: 'Active cohorts',
    widgetParticipantsLabel: 'Employees covered',
    widgetDescription:
      'This widget can describe cohort-based learning when a corporate tenant enables class-style grouping.',
    widgetCta: 'Open Cohorts',
  },
}
