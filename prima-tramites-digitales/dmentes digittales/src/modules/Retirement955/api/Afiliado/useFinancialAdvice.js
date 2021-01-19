import useSWR from 'swr';
import SharedModule from 'modules/shared';
import { isEmpty, isNil } from 'ramda';

const { ServiceFetcher } = SharedModule.libs;

function useFinancialAdvice() {
  const { data, error } = useSWR('/financial-advices/unfinished', ServiceFetcher, {
    revalidateOnFocus: false,
  });
  return {
    financialAdvice: data,
    isLoading: !error && isNil(data),
    isError: error,
    hasFinancialAdviceInfo: !isNil(data) && !isEmpty(data),
  };
}

export default useFinancialAdvice;
