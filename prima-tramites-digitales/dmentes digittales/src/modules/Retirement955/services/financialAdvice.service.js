import SharedModule from 'modules/shared';
const { libs: { AppSession, ServiceFetcher } } = SharedModule;

export function finishProcess(financialAdvice) {
  return ServiceFetcher('/financial-advices', {
    method: 'POST',
    body: financialAdvice,
  })
}
