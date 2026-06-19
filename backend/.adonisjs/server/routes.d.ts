import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'public.courses_public.index': { paramsTuple?: []; params?: {} }
    'public.classes_public.index': { paramsTuple?: []; params?: {} }
    'public.compliance_public.index': { paramsTuple?: []; params?: {} }
    'public.guardians_public.index': { paramsTuple?: []; params?: {} }
    'public.teams_public.index': { paramsTuple?: []; params?: {} }
    'admin.courses_admin.index': { paramsTuple?: []; params?: {} }
    'admin.classes_admin.index': { paramsTuple?: []; params?: {} }
    'admin.compliance_admin.index': { paramsTuple?: []; params?: {} }
    'admin.guardians_admin.index': { paramsTuple?: []; params?: {} }
    'admin.teams_admin.index': { paramsTuple?: []; params?: {} }
    'internal.runtime_config_refresh.store': { paramsTuple?: []; params?: {} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'public.courses_public.index': { paramsTuple?: []; params?: {} }
    'public.classes_public.index': { paramsTuple?: []; params?: {} }
    'public.compliance_public.index': { paramsTuple?: []; params?: {} }
    'public.guardians_public.index': { paramsTuple?: []; params?: {} }
    'public.teams_public.index': { paramsTuple?: []; params?: {} }
    'admin.courses_admin.index': { paramsTuple?: []; params?: {} }
    'admin.classes_admin.index': { paramsTuple?: []; params?: {} }
    'admin.compliance_admin.index': { paramsTuple?: []; params?: {} }
    'admin.guardians_admin.index': { paramsTuple?: []; params?: {} }
    'admin.teams_admin.index': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'public.courses_public.index': { paramsTuple?: []; params?: {} }
    'public.classes_public.index': { paramsTuple?: []; params?: {} }
    'public.compliance_public.index': { paramsTuple?: []; params?: {} }
    'public.guardians_public.index': { paramsTuple?: []; params?: {} }
    'public.teams_public.index': { paramsTuple?: []; params?: {} }
    'admin.courses_admin.index': { paramsTuple?: []; params?: {} }
    'admin.classes_admin.index': { paramsTuple?: []; params?: {} }
    'admin.compliance_admin.index': { paramsTuple?: []; params?: {} }
    'admin.guardians_admin.index': { paramsTuple?: []; params?: {} }
    'admin.teams_admin.index': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'internal.runtime_config_refresh.store': { paramsTuple?: []; params?: {} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}