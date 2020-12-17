import AppSession from 'modules/shared/libs/AppSession';
import { ServiceAuth } from './services';
import { rolesService } from './roles.service';

export async function LoginService(username, password) {
  try {
    const user = await ServiceAuth(username, password);
    AppSession.createUser(user);
    await rolesService.getCurrentUserRoles();
    window.location.reload();
    return user;
  } catch (error) {
    AppSession.destroy();
    return Promise.reject({ code: error.code });
  }
};
