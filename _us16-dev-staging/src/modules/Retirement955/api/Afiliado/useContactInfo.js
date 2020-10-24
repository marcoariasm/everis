import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function useContactInfo(options) {
  const { data, error } = useSWR('/affiliate/contact-info', ServiceFetcher, {
    ...options,
    revalidateOnFocus: false,
  })
  return {
    contactInfo: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useContactInfo
