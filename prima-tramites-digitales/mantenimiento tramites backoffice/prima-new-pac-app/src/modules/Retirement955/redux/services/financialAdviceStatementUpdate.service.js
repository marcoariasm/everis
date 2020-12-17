import SharedModule from 'modules/shared';

const { libs: { ServiceFetcher } } = SharedModule;

const updateStatement = async (financialAdviceId, body) => {
  try {
    await ServiceFetcher(
      `/financial-advice/${financialAdviceId}/statement/onp-pensioner`,
      {
        method: 'PUT',
        body,
      },
    );
    return 'Success';
  } catch (error) {
    throw new Error(error);
  }
};

export default updateStatement;
