import useSWR from 'swr'
import SharedModule from 'modules/shared'
const { ServiceFetcher } = SharedModule.libs

function usePerfilamiento() {
	const { data, error } = useSWR('/non-pensionable/retirement-95-5/apt-to', ServiceFetcher, {
		revalidateOnFocus: false,
		shouldRetryOnError: false,
		dedupingInterval: 120000
	})
	return {
		profiling: data,
		isLoading: !error && !data,
		isError: error,
	}
}

export default usePerfilamiento
