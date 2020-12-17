import SharedModule from 'modules/shared';

const { libs: { AppSession, ServiceFetcher } } = SharedModule;

function getCurrentUserRoles() {
  return ServiceFetcher('/security/my-roles')
    .then(
      (roles) => {
        AppSession.createRoles(roles);
        return roles;
      },
    )
    .catch(() => Promise.reject({ code: 401 }));
}

export const rolesService = {
  getCurrentUserRoles,
};
