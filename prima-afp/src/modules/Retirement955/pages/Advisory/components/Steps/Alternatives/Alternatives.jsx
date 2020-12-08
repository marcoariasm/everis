import React, { useState, useEffect, useReducer } from 'react';
import MediaQuery from 'react-responsive';
import { Redirect, useHistory } from 'react-router-dom';

import { AlternativesProvider } from '../../../../../contexts/AlternativesProvider';

import useTotalBalance from 'modules/Retirement955/api/Globales/useTotalBalance';
import usePension from 'modules/Retirement955/api/Globales/usePension';

import WhiteCard from 'modules/shared/components/WhiteCard';
import Tabs from 'global/components/v1/Tabs/Tabs';

import { WithdrawFund } from './Steps/WithdrawFund';
import { SlideView } from './Carousel';
import { RetirementPension } from './Steps/RetirementPension';
import PopPupWarning from 'modules/shared/components/PopPupValidation/PopPupWarning';
import { PercentageFund } from './Steps/PercentageFund';
import Paginator from 'global/components/v1/Paginator/Paginator';
import { Loading } from 'global/components/v1/Loading';
import { Header } from './Header';

import useFinishFinancialAdvices from '../../../../../hooks/financialAdvice/useFinishFinancialAdvices';

import Retiro from 'shared/images/retiro.svg';
import Porcentaje from 'shared/images/porcentaje.svg';
import Pension from 'shared/images/pension.svg';

export default function Alternatives({ setStep }) {
	const { totalBalance, isLoading: isLoadingTotalBalance } = useTotalBalance();
	const { pension, isLoading: isLoadingPension } = usePension();
	const { saveFinancialAdvice } = useFinishFinancialAdvices();
	const [isSaving, setIsSaving] = useState(false);
	const history = useHistory();

	const [validation, setValidation] = useState(false);
	const [messageValidation, setMessageValidation] = useState(null);
	const [showModalValidation, setShowModalValidation] = useState(false);
	const [visibility, setVibility] = useState(0);
	const [numStep, setNumStep] = useState(0);

	const resource = [
		{ name: Retiro, nameShort: 'Retiro', label: 'Recibir una pensión de jubilación' },
		{
			name: Porcentaje,
			nameShort: 'Porcentaje',
			label: 'Retirar un porcentaje de tu fondo y recibir una pensión del saldo',
		},
		{ name: Pension, nameShort: 'Pension', label: 'Retirar el 95.5% de tu fondo' },
	];

	const handleOnChange = (e) => {
		setVibility(e);
		setNumStep(e + 1);
	};

	function getCheck(event) {
		setValidation(event);
	}

	const componentArray = [
		<RetirementPension totalBalance={totalBalance} />,
		<WithdrawFund totalBalance={totalBalance} />,
		<PercentageFund onChange={getCheck} totalBalance={totalBalance} />,
	];

	const handleNextStep = () => {
		return true;
	};

	const handleShowModalValidation = (e) => {
		setShowModalValidation(true);
	};

	const handleCloseModalValidation = (e) => {
		setShowModalValidation(false);
	};
	function getSteps(event) {
		const stateStep = event.filter((el, index) => event.indexOf(el) === index);
		setNumStep(stateStep.length);
	}

	const finishAdvisory = async () => {
		setIsSaving(true);
		try {
			await saveFinancialAdvice();
			setIsSaving(false);
			history.push('/proceso95-5/completionOfAdvisory');
		} catch (error) {
			setIsSaving(false);
		}
	};

	const handleNextPage = (e) => {
		if (numStep < 3) {
			setMessageValidation('Aún no has terminado de ver todas las alternativas que hemos preparado para ti');
		} else {
			if (!validation) {
				setMessageValidation('Debes aceptar la Declaración Jurada de conformidad de la asesoría recibida.');
			}
		}
		if (e === 'next') {
			if (numStep < 3 || !validation) {
				handleShowModalValidation();
			} else {
				finishAdvisory();
			}
		} else if (e === 'return') {
			setStep((step) => step - 1);
		}
	};

	return (
		<AlternativesProvider>
			<PopPupWarning
				widthB='170px'
				heightB='45px'
				marginT='50px'
				marginB='40px'
				justifyContent='center'
				nameButton='Entendido'
				hideButtonCancel={true}
				show={showModalValidation}
				onClose={() => setShowModalValidation(false)}
				onClick={() => setShowModalValidation(false)}
				texto={messageValidation}
			/>
			{isLoadingTotalBalance || isLoadingPension || isSaving ? (
				<Loading />
			) : (
				<>
					<MediaQuery maxDeviceWidth={767}>
						<WhiteCard>
							<Header />
							<SlideView src={resource} funct={handleOnChange} />
							{componentArray[visibility]}
						</WhiteCard>
					</MediaQuery>
					<MediaQuery minDeviceWidth={767}>
						<WhiteCard>
							<Header />
							<Tabs onSteps={getSteps}>
								<div label='Recibir una pensión de jubilación' src={Retiro}>
									<RetirementPension totalBalance={totalBalance} />
								</div>
								<div label='Retirar un porcentaje de tu fondo y recibir una pensión del saldo' src={Porcentaje}>
									<WithdrawFund totalBalance={totalBalance} />
								</div>
								<div label='Retirar el 95.5% de tu fondo' src={Pension}>
									<PercentageFund onChange={getCheck} totalBalance={totalBalance} />
								</div>
							</Tabs>
						</WhiteCard>
					</MediaQuery>
					<Paginator
						nameButton='Finalizar'
						widthB='120px'
						heightB='45px'
						setStep={setStep}
						next={handleNextStep}
						onClick={handleNextPage}
					/>
				</>
			)}
		</AlternativesProvider>
	);
}
