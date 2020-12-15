import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

function useCics() {
  const { data, error } = useSWR(`${process.env.REACT_APP_MOCK_URL}/cics`, ServiceFetcher);

  return {
    cics: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useCics;
