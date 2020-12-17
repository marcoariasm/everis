import useSWR from 'swr';
import SharedModule from '../../shared';

const { ServiceFetcher } = SharedModule.libs;

function useFinancialAdvice() {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_API_URL}/financial-advice`, ServiceFetcher,
  );

  return {
    financialAdvice: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFinancialAdvice;
