import useSWR from 'swr';
import SharedModule from '../../shared';

const { ServiceFetcher } = SharedModule.libs;

function useFinancialAdviceDetail(id) {
  const { data, error } = useSWR(
    id ? `${process.env.REACT_APP_API_URL}/financial-advice/${id}` : null,
    ServiceFetcher,
    { revalidateOnMount: true, refreshWhenHidden: true },
  );

  return {
    financialAdviceDetail: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFinancialAdviceDetail;
