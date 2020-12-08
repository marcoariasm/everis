import useSWR from 'swr'
import libs from '../libs'
const { ServiceFetcher } = libs;

function useMe() {
  const { data, error } = useSWR('/me', ServiceFetcher, { revalidateOnFocus: false })

  return {
    affiliate: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useMe
