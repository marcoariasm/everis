import SharedModule from 'modules/shared/index';

const {
  libs: { AppSession, ServiceFetcher },
} = SharedModule;

export const userState = {
    inactive: 'inactive',
    incomplete: 'incomplete'
}

export const manageLoginSesion = (user, session) => {
    if (user.inUpdate === '1') AppSession.create(session);
    if (user.inActivation === '0') return userState.inactive;
    if (user.inUpdate === '0') return userState.incomplete;
}

export const setSession = (session) => {
  AppSession.create(session);
}