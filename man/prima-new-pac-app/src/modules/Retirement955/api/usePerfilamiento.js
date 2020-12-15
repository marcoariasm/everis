import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

function usePerfilamiento() {
  const { data, error } = useSWR(`${process.env.REACT_APP_MOCK_URL}/perfilamiento`, ServiceFetcher);
  return {
    perfilamiento: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default usePerfilamiento;
