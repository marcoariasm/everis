import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

const useStates = () => {
  const { data, error } = useSWR(`${process.env.REACT_APP_MOCK_URL}/states`, ServiceFetcher);
  return {
    states: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useStates;
