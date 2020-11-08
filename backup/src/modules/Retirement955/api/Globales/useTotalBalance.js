import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function useTotalBalance() {
  const { data, error } = useSWR('/cic/balance/pension-available', ServiceFetcher, { revalidateOnFocus: false })
  return {
    totalBalance: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useTotalBalance
