/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  public: {
    coursesPublic: {
      index: typeof routes['public.courses_public.index']
    }
    classesPublic: {
      index: typeof routes['public.classes_public.index']
    }
    compliancePublic: {
      index: typeof routes['public.compliance_public.index']
    }
    guardiansPublic: {
      index: typeof routes['public.guardians_public.index']
    }
    teamsPublic: {
      index: typeof routes['public.teams_public.index']
    }
  }
  admin: {
    coursesAdmin: {
      index: typeof routes['admin.courses_admin.index']
    }
    classesAdmin: {
      index: typeof routes['admin.classes_admin.index']
    }
    complianceAdmin: {
      index: typeof routes['admin.compliance_admin.index']
    }
    guardiansAdmin: {
      index: typeof routes['admin.guardians_admin.index']
    }
    teamsAdmin: {
      index: typeof routes['admin.teams_admin.index']
    }
  }
  internal: {
    runtimeConfigRefresh: {
      store: typeof routes['internal.runtime_config_refresh.store']
    }
  }
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
}
