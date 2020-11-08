import useSWR from 'swr'
import SharedModule from 'modules/shared';
const { ServiceFetcher } = SharedModule.libs;

function useCic() {
  const { data, error } = useSWR(`${process.env.REACT_APP_MOCK_URL}/cic`, ServiceFetcher)

  return {
    cic: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useCic
