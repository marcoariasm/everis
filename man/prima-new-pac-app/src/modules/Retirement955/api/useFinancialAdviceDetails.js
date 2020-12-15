import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

function useFinancialAdviceDetails() {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_MOCK_URL}/financial_advice_details`, ServiceFetcher,
  );

  return {
    financialAdviceDetail: data,
    isLoadingFinancialAdviceDetail: !error && !data,
    isErrorFinancialAdviceDetail: error,
  };
}

export default useFinancialAdviceDetails;
