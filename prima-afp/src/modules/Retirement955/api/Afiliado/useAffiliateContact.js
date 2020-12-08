import useSWR from 'swr'
import SharedModule from 'modules/shared'

const { ServiceFetcher } = SharedModule.libs

const useContactInfo = () => {
  const { data, error } = useSWR('/affiliate/contact-info', (url) => ServiceFetcher(url), {
    revalidateOnFocus: false,
  })

  return {
    contactInfo: {
      data,
      loading: !error && !data,
      error,
    },
  }
}

export default useContactInfo
