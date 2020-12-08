import SharedModule from 'modules/shared';
const {
	libs: { ServiceFetcher },
} = SharedModule;

export const alternativesService = (percentage) => {
	return ServiceFetcher('/simulation/pension', {
		method: 'POST',
		body: { percentage: percentage },
	});
};

export const alternativerService0 = (percentage) => {
	return ServiceFetcher('/simulation/pension', {
		method: 'POST',
		body: { percentage: 0 },
	});
};

export const alternativerService45 = (percentage) => {
	return ServiceFetcher('/simulation/pension', {
		method: 'POST',
		body: { percentage: 4.5 },
	});
};
