import serviceFetcher from '../../shared/libs/ServiceFetcher';

function financialAdvice(financialAdviceId, financialAdviceValidationId) {
  return serviceFetcher(
    `/financial-advice/${financialAdviceId}/validate/${financialAdviceValidationId}`,
    {
      method: 'PUT',
      body: {},
      authenticated: true,
    },
  ).then(() => {
    console.log('SUNAT updated!');
  });
}

export default financialAdvice;
