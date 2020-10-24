import useSWR from 'swr'
import SharedModule from 'modules/shared';
const { ServiceFetcher } = SharedModule.libs;

function useDataCoorporation() {
  const { data, error } = useSWR(`https://api-mocky-php.rolabs.dev/web/information`, ServiceFetcher)

  return {
    dataCoorporation: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useDataCoorporation
