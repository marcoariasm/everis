import useSWR from 'swr';
import { prop } from 'ramda';
import libs from '../libs';

const { ServiceFetcher } = libs;

function useMe() {
  const { data, error } = useSWR(`${process.env.REACT_APP_API_PROCEDURES}/v1/me`, ServiceFetcher, { revalidateOnFocus: false });

  const advisor = {
    friendlyName: data ? `${prop('names', data)} ${prop('lastnames', data)}` : 'No disponible',
    ...data,
  };

  return {
    advisor,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useMe;
