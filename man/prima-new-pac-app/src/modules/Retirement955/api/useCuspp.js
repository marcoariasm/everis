import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

const useCuspp = () => {
  const { data, error } = useSWR(`${process.env.REACT_APP_MOCK_URL}/cuspp`, ServiceFetcher);
  return {
    cuspp: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCuspp;
