import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

const documentTypesApi = '/excluded/information/id-document/types';

const useDocumentType = (fetchOptions = {}, options = {}) => {
  const { data, error } = useSWR(
    documentTypesApi,
    (url) => ServiceFetcher(url, fetchOptions),
    { ...options, revalidateOnFocus: false }
  );

  return {
    documentType: {
      data,
      loading: !error && !data,
      error,
    },
  }
}

export default useDocumentType;
