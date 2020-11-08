import useSWR from 'swr'
import libs from '../libs'
const { ServiceFetcher } = libs;

function useApplicant() {
  const { data, error } = useSWR(`${process.env.REACT_APP_APPLICANT_API}/v1/me`, ServiceFetcher);
  
  return {
    applicant: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useApplicant
