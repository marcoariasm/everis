import useSWR from 'swr';
import SharedModule from 'modules/shared';

const { ServiceFetcher } = SharedModule.libs;

const useAdvisor = (id) => {
  const { data, error } = useSWR(`/advisor${id ? `/${id}` : ''}`, ServiceFetcher);

  return {
    advisor: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useAdvisor;
