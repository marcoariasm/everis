import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

function useTotalBalance() {
  const { data, error } = useSWR(`${process.env.REACT_APP_MOCK_URL}/totalBalance`, ServiceFetcher);
  return {
    totalBalance: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useTotalBalance;
