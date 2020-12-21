import useSWR from 'swr';
import SharedModule from 'modules/shared';
const { ServiceFetcher } = SharedModule.libs;

function useParameter(value) {
	const { data, error } = useSWR(`/parameter?idTypeParameter=${value}`, ServiceFetcher, {
		revalidateOnFocus: false,
	});

	return {
		parameter: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export default useParameter;
