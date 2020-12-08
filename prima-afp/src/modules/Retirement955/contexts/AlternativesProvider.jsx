import React, { useMemo, useState, useEffect } from 'react';

import { alternativesService } from 'modules/Retirement955/services/alternatives.service';

import { prop, forEach, isNil } from 'ramda';

import { currencyFormat } from '../pages/Advisory/components/Steps/Alternatives/Steps/Header';

const AlternativesContext = React.createContext();

export const getSimulationValue = (sourceSimulation) => (type) => {
	if (prop('error', sourceSimulation)) return '--';
	const simulationValue = prop(type, sourceSimulation);
	return !isNil(simulationValue) ? `S/ ${currencyFormat(simulationValue)}` : 'calculando...';
};

export function AlternativesProvider(props) {
	const [simulations, setSimulations] = useState({});

	const getSimulationValues = () => {
		const alternativesPercentages = [0, 25, 50, 75, 95.5, 4.5];
		forEach((percentage) => {
			alternativesService(percentage)
				.then((response) => {
					setSimulations((initial) => ({ ...initial, [percentage]: response }));
				})
				.catch(() => {
					setSimulations((initial) => ({ ...initial, [percentage]: { error: true } }));
				});
		}, alternativesPercentages);
	};

	useEffect(() => {
		getSimulationValues();
	}, []);

	const alternativeData = useMemo(
		() => ({
			simulations,
		}),
		[simulations]
	);

	return <AlternativesContext.Provider value={alternativeData} {...props} />;
}

export function useAlternatives() {
	const context = React.useContext(AlternativesContext);
	if (!context) {
		throw new Error('AlternativesProvider provider is required');
	}
	return context;
}
