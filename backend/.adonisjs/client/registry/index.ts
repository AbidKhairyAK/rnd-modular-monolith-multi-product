/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'public.courses_public.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/public/courses',
    tokens: [{"old":"/api/v1/public/courses","type":0,"val":"api","end":""},{"old":"/api/v1/public/courses","type":0,"val":"v1","end":""},{"old":"/api/v1/public/courses","type":0,"val":"public","end":""},{"old":"/api/v1/public/courses","type":0,"val":"courses","end":""}],
    types: placeholder as Registry['public.courses_public.index']['types'],
  },
  'public.classes_public.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/public/classes',
    tokens: [{"old":"/api/v1/public/classes","type":0,"val":"api","end":""},{"old":"/api/v1/public/classes","type":0,"val":"v1","end":""},{"old":"/api/v1/public/classes","type":0,"val":"public","end":""},{"old":"/api/v1/public/classes","type":0,"val":"classes","end":""}],
    types: placeholder as Registry['public.classes_public.index']['types'],
  },
  'public.compliance_public.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/public/compliance',
    tokens: [{"old":"/api/v1/public/compliance","type":0,"val":"api","end":""},{"old":"/api/v1/public/compliance","type":0,"val":"v1","end":""},{"old":"/api/v1/public/compliance","type":0,"val":"public","end":""},{"old":"/api/v1/public/compliance","type":0,"val":"compliance","end":""}],
    types: placeholder as Registry['public.compliance_public.index']['types'],
  },
  'public.guardians_public.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/public/guardians',
    tokens: [{"old":"/api/v1/public/guardians","type":0,"val":"api","end":""},{"old":"/api/v1/public/guardians","type":0,"val":"v1","end":""},{"old":"/api/v1/public/guardians","type":0,"val":"public","end":""},{"old":"/api/v1/public/guardians","type":0,"val":"guardians","end":""}],
    types: placeholder as Registry['public.guardians_public.index']['types'],
  },
  'public.teams_public.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/public/teams',
    tokens: [{"old":"/api/v1/public/teams","type":0,"val":"api","end":""},{"old":"/api/v1/public/teams","type":0,"val":"v1","end":""},{"old":"/api/v1/public/teams","type":0,"val":"public","end":""},{"old":"/api/v1/public/teams","type":0,"val":"teams","end":""}],
    types: placeholder as Registry['public.teams_public.index']['types'],
  },
  'admin.courses_admin.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/courses',
    tokens: [{"old":"/api/v1/admin/courses","type":0,"val":"api","end":""},{"old":"/api/v1/admin/courses","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/courses","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/courses","type":0,"val":"courses","end":""}],
    types: placeholder as Registry['admin.courses_admin.index']['types'],
  },
  'admin.classes_admin.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/classes',
    tokens: [{"old":"/api/v1/admin/classes","type":0,"val":"api","end":""},{"old":"/api/v1/admin/classes","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/classes","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/classes","type":0,"val":"classes","end":""}],
    types: placeholder as Registry['admin.classes_admin.index']['types'],
  },
  'admin.compliance_admin.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/compliance',
    tokens: [{"old":"/api/v1/admin/compliance","type":0,"val":"api","end":""},{"old":"/api/v1/admin/compliance","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/compliance","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/compliance","type":0,"val":"compliance","end":""}],
    types: placeholder as Registry['admin.compliance_admin.index']['types'],
  },
  'admin.guardians_admin.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/guardians',
    tokens: [{"old":"/api/v1/admin/guardians","type":0,"val":"api","end":""},{"old":"/api/v1/admin/guardians","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/guardians","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/guardians","type":0,"val":"guardians","end":""}],
    types: placeholder as Registry['admin.guardians_admin.index']['types'],
  },
  'admin.teams_admin.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/admin/teams',
    tokens: [{"old":"/api/v1/admin/teams","type":0,"val":"api","end":""},{"old":"/api/v1/admin/teams","type":0,"val":"v1","end":""},{"old":"/api/v1/admin/teams","type":0,"val":"admin","end":""},{"old":"/api/v1/admin/teams","type":0,"val":"teams","end":""}],
    types: placeholder as Registry['admin.teams_admin.index']['types'],
  },
  'internal.runtime_config_refresh.store': {
    methods: ["POST"],
    pattern: '/api/v1/internal/runtime-config/refresh',
    tokens: [{"old":"/api/v1/internal/runtime-config/refresh","type":0,"val":"api","end":""},{"old":"/api/v1/internal/runtime-config/refresh","type":0,"val":"v1","end":""},{"old":"/api/v1/internal/runtime-config/refresh","type":0,"val":"internal","end":""},{"old":"/api/v1/internal/runtime-config/refresh","type":0,"val":"runtime-config","end":""},{"old":"/api/v1/internal/runtime-config/refresh","type":0,"val":"refresh","end":""}],
    types: placeholder as Registry['internal.runtime_config_refresh.store']['types'],
  },
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
