import useSWR from 'swr';
import SharedModule from '../../shared';

const { ServiceFetcher } = SharedModule.libs;

function useDocumentManagerDocumenType() {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_API_URL}/document-manager/document-type`, ServiceFetcher,
  );

  const toSelect = [];

  if (data) {
    data.forEach((dataItem) => {
      toSelect.push({
        label: dataItem.documentType,
        value: dataItem.documentTypeId,
      });
    });
  }

  return {
    documentType: data,
    documentTypeSelect: toSelect,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useDocumentManagerDocumenType;
