import SharedModule from 'modules/shared/index';
const { libs: { AppSession, ServiceFetcher } } = SharedModule;

export default function finalizeProcess(financialAdvice) {
  return ServiceFetcher('/financial-advices', {
    method: 'POST',
    body: financialAdvice,
  })
}
