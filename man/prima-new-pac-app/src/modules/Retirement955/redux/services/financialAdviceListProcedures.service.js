import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

const updateStatement = async (query) => {
  try {
    const data = await ServiceFetcher(`/financial-advice?${query}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default updateStatement;
