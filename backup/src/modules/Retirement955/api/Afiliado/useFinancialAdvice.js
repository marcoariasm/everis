import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function useFinancialAdvice() {
  const { data, error } = useSWR('/financial-advices/unfinished', ServiceFetcher, {
    revalidateOnFocus: false,
    onErrorRetry: (error) => {
      if (error.status === 204) return
    },
  })
  return {
    financialAdvice: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useFinancialAdvice
