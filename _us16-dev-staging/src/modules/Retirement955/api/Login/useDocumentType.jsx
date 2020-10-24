import useSWR from 'swr'
import SharedModule from 'modules/shared'

const { ServiceFetcher } = SharedModule.libs

const useDocumentType = (fetchOptions = {}, options = {}) => {
  const { data, error } = useSWR(
    '/excluded/information/id-document/types',
    (url) => ServiceFetcher(url, fetchOptions),
    {
      ...options,
      revalidateOnFocus: false,
    }
  )

  return {
    documentType: {
      data,
      loading: !error && !data,
      error,
    },
  }
}

export default useDocumentType
