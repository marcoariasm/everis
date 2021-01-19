import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useBeneficiaries from 'modules/Retirement955/api/Afiliado/useBeneficiaries';
import { alternativesService } from 'modules/Retirement955/services/alternatives.service';

import { setIdSelectedBeneficiares } from 'redux/actions/Advisor';

import { filter, forEach, includes, isNil, map, pipe, prop } from 'ramda';

import { currencyFormat } from '../pages/Advisory/components/Steps/Alternatives/Steps/Header';

const AlternativesContext = React.createContext();

export const getSimulationValue = (sourceSimulation) => (type) => {
	if (prop('error', sourceSimulation)) return '--';
	const simulationValue = prop(type, sourceSimulation);
	return !isNil(simulationValue) ? `S/ ${currencyFormat(simulationValue)}` : 'calculando...';
};

export function AlternativesProvider(props) {
	const [simulations, setSimulations] = useState({});
	const { beneficiario } = useBeneficiaries();
	const { idSelectedBeneficiaries, selectedBeneficiaries } = useSelector((state) => state.advisor);
	const dispatch = useDispatch();

	const getIdBeneficiaries = () =>
		pipe(
			filter((beneficiary) => includes(beneficiary.documentNumber, selectedBeneficiaries || [])),
			map(prop('beneficiaryId'))
		)(beneficiario || []);

	const arrayBeneficiaries = getIdBeneficiaries().map((id) => Number(id));

	const getSimulationValues = () => {
		const alternativesPercentages = [0, 25, 50, 75, 95.5, 4.5];

		forEach((percentage) => {
			alternativesService(percentage, arrayBeneficiaries)
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
		dispatch(setIdSelectedBeneficiares([...arrayBeneficiaries]));
	}, []);

	const alternativeData = useMemo(
		() => ({
			simulations,
			idSelectedBeneficiaries,
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
