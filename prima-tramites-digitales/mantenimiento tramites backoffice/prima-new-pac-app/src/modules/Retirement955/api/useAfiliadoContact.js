import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

function useAfiliadoContact(cuspp) {
  const { data, error } = useSWR(
    cuspp
      ? `/affiliate/${cuspp}/contact-information`
      : null, ServiceFetcher,
  );

  return {
    afiliadoContact: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useAfiliadoContact;
