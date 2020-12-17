import useSWR from 'swr'
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

function useAfiliado() {
  const { data, error } =  useSWR(`${process.env.REACT_APP_MOCK_URL}/afiliates`, ServiceFetcher)

  return {
    afiliado: data?.affiliates[0],
    isLoading: !error && !data,
    isError: error
  }
}

export default useAfiliado