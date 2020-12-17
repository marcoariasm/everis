import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function useBeneficiaries() {
  const { data, error, mutate } = useSWR(`/affiliate/beneficiaries`, ServiceFetcher,{
    revalidateOnFocus:false
  })

  return {
    beneficiario: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}

export default useBeneficiaries
