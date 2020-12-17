import useSWR from 'swr';
import SharedModule from 'modules/shared';
import { isEmpty } from 'ramda';

const { ServiceFetcher } = SharedModule.libs;

const isEmptyResponse = (data) => isEmpty(data);
const RESPONSE_DEFAULT = {};

function usePensionBonus(cuspp) {
  const { data, error } = useSWR(`/${cuspp}/pensionable/pension-bonus`, ServiceFetcher);

  let response = data;
  if (isEmptyResponse(response)) response = RESPONSE_DEFAULT;

  return {
    data: response,
    isLoading: !error && !response,
    isError: error,
  };
}

export default usePensionBonus;
