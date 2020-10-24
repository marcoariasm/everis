import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function useAfiliado() {
  const { data, error } = useSWR('/affiliate', ServiceFetcher, { revalidateOnFocus: false })

  return {
    affiliate: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useAfiliado
