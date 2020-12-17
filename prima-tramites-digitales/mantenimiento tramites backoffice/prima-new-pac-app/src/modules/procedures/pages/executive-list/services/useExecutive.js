import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

function useExecutive() {
  const { data, error } = useSWR(`${process.env.REACT_APP_API_PROCEDURES}/executive/v1/`, ServiceFetcher);

  return {
    executives: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useExecutive;
