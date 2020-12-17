import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

const useCic = (cuspp) => {
  const { data, error } = useSWR(`/${cuspp}/individual-capitalization-account`, ServiceFetcher);

  return {
    cic: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCic;
