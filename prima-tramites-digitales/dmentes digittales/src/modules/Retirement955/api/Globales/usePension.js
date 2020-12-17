import useSWR from 'swr'
import SharedModule from 'modules/shared';
const { ServiceFetcher } = SharedModule.libs;

const cuspp = '173751ECFDF5'

function usePension() {
  const { data, error } = useSWR(`/non-pensionable/retirement-95-5/apt-to?cuspp=${cuspp}`, ServiceFetcher)

  return {
    pension: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default usePension
