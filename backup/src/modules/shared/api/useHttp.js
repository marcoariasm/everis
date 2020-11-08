import useSWR from 'swr'
import libs from '../libs'
const { ServiceFetcher } = libs;

function useHttp(url, options) {
  const { data, error } = useSWR(url, ServiceFetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useHttp;
