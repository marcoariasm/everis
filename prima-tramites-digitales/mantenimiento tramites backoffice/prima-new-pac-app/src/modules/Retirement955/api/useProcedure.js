import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

function useProcedure() {
  const { data, error } = useSWR(`${process.env.REACT_APP_MOCK_URL}/procedure`, ServiceFetcher);

  return {
    procedures: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useProcedure;
