import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function useBalance() {
  const { data, error } = useSWR(`/cic/balance/pension-available`, ServiceFetcher, { revalidateOnFocus: false })
  return {
    profiling: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useBalance
