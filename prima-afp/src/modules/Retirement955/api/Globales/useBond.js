import useSWR from 'swr'
import SharedModule from 'modules/shared';
const { ServiceFetcher } = SharedModule.libs;

function useBond() {
  const { data, error } = useSWR(`/pensionable/pension-bonus`, ServiceFetcher)

  return {
    bond: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useBond
