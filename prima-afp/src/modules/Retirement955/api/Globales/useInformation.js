import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function useInformation(value) {
  const { data, error } = useSWR(`/information?informationGroup=${value}`, ServiceFetcher, {
    revalidateOnFocus: false,
  })

  return {
    information: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useInformation
