import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function useFinancialAdviceDetails(idFinancialAdvice) {
  const { data, error } = useSWR(
    idFinancialAdvice ? `/financial-advices/${idFinancialAdvice}` : null,
    ServiceFetcher,
    { revalidateOnFocus: false }
  )
  return {
    financialAdviceDetails: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useFinancialAdviceDetails
