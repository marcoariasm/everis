import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

function useAfiliadoInformacion(cuspp) {
  const { data, error } = useSWR(
    cuspp ? `/affiliate/${cuspp}` : null, ServiceFetcher,
  );

  return {
    afiliadoInformacion: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useAfiliadoInformacion;
