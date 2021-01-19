import React from 'react';
import { propOr } from 'ramda';

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives';
import { useAlternatives, getSimulationValue } from '../../../../../../../../contexts/AlternativesProvider';

import { ContentGrid } from './style';
import { ContentCard } from './contentStyle';

import Card from 'global/components/v2/Card/Card';

import Arrow from 'shared/images/arrow.svg';

export const ModalitiesCards = () => {
	const { simulations } = useAlternatives();
	const getSimulation25 = getSimulationValue(propOr({}, '25', simulations));
	const getSimulation50 = getSimulationValue(propOr({}, '50', simulations));
	const getSimulation75 = getSimulationValue(propOr({}, '75', simulations));

	return (
		<>
			<ContentGrid>
				<Card optionCheck={false} title='25%' options={false} image={Arrow} type='normal'>
					<ContentCard
						cantPension={getSimulation25('deliveryAmount')}
						mount={getSimulation25('scheduledWithdrawal')}
						title={textAlternatives.titleCardTwo}
						titleMensual={textAlternatives.textPensionTwo}
					/>
				</Card>
				<Card optionCheck={false} title='50%' options={false} image={Arrow} type='normal'>
					<ContentCard
						cantPension={getSimulation50('deliveryAmount')}
						mount={getSimulation50('scheduledWithdrawal')}
						title={textAlternatives.titleCardTwo}
						titleMensual={textAlternatives.textPensionTwo}
					/>
				</Card>
				<Card optionCheck={false} title='75%' options={false} image={Arrow} type='normal'>
					<ContentCard
						cantPension={getSimulation75('deliveryAmount')}
						mount={getSimulation75('scheduledWithdrawal')}
						title={textAlternatives.titleCardTwo}
						titleMensual={textAlternatives.textPensionTwo}
					/>
				</Card>
			</ContentGrid>
		</>
	);
};
