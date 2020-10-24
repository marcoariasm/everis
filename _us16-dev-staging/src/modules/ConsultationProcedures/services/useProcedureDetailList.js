import useSWR from 'swr';
import ServiceFetcher from 'modules/shared/libs/ServiceFetcher';

function useProcedureListSelect() {
  const { data, error } = useSWR(`http://localhost:3000/procedures-detail/v1/procedure-list`, ServiceFetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useProcedureListSelect;
