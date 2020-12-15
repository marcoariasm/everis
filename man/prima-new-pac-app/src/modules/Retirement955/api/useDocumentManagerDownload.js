import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

const useDocumentManagerDownload = (affiliateId, fileType, storageId) => {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_MOCK_URL}/document-manager/download?affiliateId=${affiliateId}&fileType=${fileType}&storageId=${storageId}`,
    ServiceFetcher,
  );
  return {
    states: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useDocumentManagerDownload;
