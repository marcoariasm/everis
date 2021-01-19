import React, { useEffect, useState } from 'react';
import { clone, path, prop, forEach } from 'ramda';
import { Link } from 'react-router-dom';

import { textNotAccess } from 'modules/Retirement955/constants/ConstantNotAccess';
import WhiteCard from 'modules/shared/components/WhiteCard';
import { ButtonPrincipal, ContentButton, ContentImage } from './style';
import { FailsText } from 'modules/Retirement955/pages/NotAccess/FailsText';
import { TextSecundary } from './TextSecundary';
import CardGray from 'modules/shared/components/CardGrey';

import ErrorAcceso from 'shared/images/error.svg';

const DEFAULT_ERROR_OPTIONS = {
	noBalance: false,
	fails: false,
	noRequisites: false,
	textFail: '',
	arrayFails: [],
};

function NotAccess({ profilingError }) {
	const [options, setOptions] = useState(DEFAULT_ERROR_OPTIONS);
	const profilingErrors = path(['data', 'errors'], profilingError);


	const parseErrorConditions = (errorConditions) => {
		const hasError = (item, cond) => item.code === cond && item.error === true;
		const takeError = (type) => path(['textContentInfoFail', type], textNotAccess);
		const errorDetail = clone(DEFAULT_ERROR_OPTIONS);
		forEach((condition) => {
			if (hasError(condition, 'CD3')) {
				errorDetail.noBalance = true;
				errorDetail.textFail = takeError('noBalance');
			}
			if (hasError(condition, 'CD1') || hasError(condition, 'CD2')) {
				errorDetail.fails = true;
				errorDetail.textFail = takeError('fails');
			}
			if (condition.code !== 'CD1' && condition.code !== 'CD2' && condition.code !== 'CD3') {
				errorDetail.noRequisites = true;
				errorDetail.textFail = takeError('complementText');
			}
			errorDetail.arrayFails = profilingErrors;
		}, errorConditions);
		return errorDetail;
	};

	useEffect(() => {
		if (profilingErrors) {
			setOptions(() => parseErrorConditions(profilingErrors));
		}
	}, [profilingErrors]);

	return (
		<WhiteCard marginT='83px'>
			<CardGray classButton='card-gray'>
				<ContentImage>
					<img src={ErrorAcceso} alt='Error de Acceso' />
				</ContentImage>
				{options.fails && <FailsText texto={textNotAccess.primaryText.fails} textError={options.textFail} />}
				{options.noBalance && (
					<FailsText texto={textNotAccess.primaryText.noBalance} textError={options.textFail} />
				)}
				{options.noRequisites && (
					<FailsText
						texto={textNotAccess.primaryText.noRequisites}
						textError=''
						arrayFails={prop('arrayFails', options)}
					/>
				)}
			</CardGray>
			{options.noRequisites && (
				<CardGray>
					<TextSecundary id={'39'} text={textNotAccess.primaryText.complementText} />

				</CardGray>
			)}
			<ContentButton>
				<Link to={'/inicio'}>
					<ButtonPrincipal widthB='21px' heightB='15px'>
						Volver a la página principal
					</ButtonPrincipal>
				</Link>
			</ContentButton>
		</WhiteCard>
	);
}

export default NotAccess;
