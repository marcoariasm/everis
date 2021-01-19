import SharedModule from 'modules/shared/index'
const { AppSession, ServiceFetcher } = SharedModule.libs;

export function LoginService(captchaToken, documentType, document, password) {
  return ServiceFetcher('/auth/login', {
    method: 'POST',
    body: { captchaToken, documentType, document, password },
    authenticated: false,
  }).then((user) => {
    AppSession.create(user);
    window.location.reload();
    return user;
  })
}