import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function useFinancialAdviceDetails() {
  const { data, error } = useSWR('/financial-advises/unfinished', ServiceFetcher)
  return {
    financialAdviceDetail: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useFinancialAdviceDetails
