import useSWR from 'swr';
import SharedModule from '../../shared';

const { ServiceFetcher } = SharedModule.libs;

function useFinancialAdviceStates() {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_API_URL}/financial-advice/states`, ServiceFetcher,
  );

  return {
    financialAdviceStates: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFinancialAdviceStates;
