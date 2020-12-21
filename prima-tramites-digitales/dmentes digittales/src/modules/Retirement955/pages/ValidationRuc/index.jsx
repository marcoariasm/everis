import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { isNil, prop } from 'ramda';

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento';
import useInformation from 'modules/Retirement955/api/Globales/useInformation';
import useGetBusinessDays from 'modules/Retirement955/hooks/useGetBusinessDays';
import useContactInfo from 'modules/Retirement955/api/Afiliado/useAffiliateContact';

import { BUSINESS_DAY, profilingValue } from 'modules/Retirement955/constants/Parameters';

import WhiteCard from 'modules/shared/components/WhiteCard';
import SelectOption from 'modules/Retirement955/pages/ValidationRuc/components/MainSection/SelectOption';
import PopPupWarning from 'modules/shared/components/PopPupValidation/PopPupWarning';
import Paginator from 'global/components/v1/Paginator/Paginator';
import { Loading } from 'global/components/v1/Loading';
import Header from 'modules/shared/components/Header';
import ContentText from 'modules/Retirement955/pages/ValidationRuc/components/TitleSection/ContentText';
import ContainerText from 'modules/Retirement955/pages/ValidationRuc/components/FooterSection/ContainerText';
import CardContainer from 'modules/Retirement955/pages/ValidationRuc/components/MainSection/CardContainer';
import CardGray from 'modules/shared/components/CardGrey';

function ValidationRuc() {
	const { profiling, isLoading: isLoadingProfiling } = usePerfilamiento();
	const { information: informationDay } = useInformation(BUSINESS_DAY);
	const { contactInfo } = useContactInfo({
		authenticated: false,
	});

	const businessDays = useGetBusinessDays(prop('SUNAT_LIMIT_DAYS', informationDay));

	const [validation, setValidation] = useState(null);
	const [declaration, setDeclaration] = useState(false);
	const [fail, setFail] = useState(false);
	const [showModalValidation, setShowModalValidation] = useState(false);
	const [messageValidation, setMessageValidation] = useState(null);
	const [redirection, setRedirection] = useState(false);
	const [backRedirection, setBackRedirection] = useState(false);
	const [selectOptions, setSelectOptions] = useState(null);

	useEffect(() => {
		if (contactInfo.data) {
			const options = {
				phones: contactInfo.data.phones,
				email: contactInfo.data.email,
			};
			setSelectOptions(options);
		}
	}, [contactInfo.data]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleShowModalValidation = () => {
		setShowModalValidation(true);
	};

	const handleCloseModalValidation = () => {
		setShowModalValidation(false);
	};

	const email = prop('email', selectOptions);

	function getCheck(event) {
		setValidation(event);
	}

	function getDeclaration(event) {
		setDeclaration(event);
	}

	const unemployment = useSelector((state) => state.advisor.unemployment);

	function getError() {
		if (unemployment) {
			setDeclaration(unemployment);
		}

		if (validation === 'no_ruc') {
			setFail(false);
		}

		if (validation === null || (declaration === false && unemployment === false)) {
			return ' Por favor completa la información requerida en la pantalla para que puedas continuar con el trámite';
		}
		if (validation === 'si_ruc' && fail === false) {
			return ' Por favor completa la información requerida en la pantalla para que puedas continuar con el trámite';
		} else {
			setFail(false);
			return '';
		}
	}

	function getFail(event) {
		setFail(event);
	}

	function getClick(event) {
		if (event === 'next') {
			const error = getError();
			setMessageValidation(error);
			if (error) {
				handleShowModalValidation();
			} else {
				setRedirection(true);
				window.scrollTo(0, 0);
			}
		} else if (event === 'return') {
			setBackRedirection(true);
			window.scrollTo(0, 0);
		}
	}

	if (isLoadingProfiling || contactInfo.loading || isNil(informationDay)) {
		return <Loading />;
	}

	return (
		<>
			<CardGray>
				{profiling.regime === profilingValue[0].value && (
					<Header
						title='Etapa 01: Pre - Requisitos'
						text='Trámite de jubilación anticipada por desempleo (REJA) y/o retiro de hasta el 95.5% de tu fondo.'
					/>
				)}
				{(profiling.regime === profilingValue[1].value ||
					profiling.regime === profilingValue[2].value ||
					profiling.regime === profilingValue[3].value) && (
					<Header
						title='Etapa 01: Pre - Requisitos'
						text='Trámite de jubilación por edad Legal y/o retiro de hasta el 95.5% de tu fondo.'
					/>
				)}
			</CardGray>
			{ReactDOM.createPortal(
				<PopPupWarning
					widthB='170px'
					heightB='45px'
					marginT='50px'
					marginB='40px'
					justifyContent='center'
					nameButton='Entendido'
					hideButtonCancel={true}
					show={showModalValidation}
					onClose={handleCloseModalValidation}
					onClick={handleCloseModalValidation}
					texto={messageValidation}
				/>,
				document.getElementById('modal')
			)}
			<WhiteCard>
				<ContentText />
				<CardContainer onChange={getCheck} />
				<SelectOption validation={validation} email={email} businessDay={businessDays} onChange={getFail} />
				<ContainerText onChange={getDeclaration} />
			</WhiteCard>
			<MediaQuery maxDeviceWidth={375}>
				<Paginator widthB='120px' heightB='45px' onClick={getClick} />
			</MediaQuery>
			<MediaQuery minDeviceWidth={376}>
				<Paginator widthB='138px' heightB='45px' onClick={getClick} />
			</MediaQuery>
			{redirection && <Redirect to='/proceso95-5/homeAdvice'></Redirect>}
			{backRedirection && <Redirect to='/proceso95-5/dataValidation'></Redirect>}
		</>
	);
}

export default ValidationRuc;
