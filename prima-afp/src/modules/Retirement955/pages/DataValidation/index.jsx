import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento';
import useContactInfo from 'modules/Retirement955/api/Afiliado/useAffiliateContact';
import useAfiliado from 'modules/Retirement955/api/Afiliado/useAfiliado';

import useGetErrorContactInfo from 'modules/Retirement955/hooks/useGetErrorContactInfo';

import { textHeader } from 'modules/Retirement955/constants/ConstantHeader';
import { textDataValidation } from 'modules/Retirement955/constants/ConstantDataValidation';
import { profilingValue } from 'modules/Retirement955/constants/Parameters';

import WhiteCard from 'modules/shared/components/WhiteCard';
import UpdateContent from './components/FooterSection/UpdateContent';
import Paginator from 'global/components/v1/Paginator/Paginator';
import TextFinal from './components/FooterSection/TextFinal';
import TableHeading from 'modules/Retirement955/pages/DataValidation/components/MainSection/TableHeading';
import PopPupWarning from 'modules/shared/components/PopPupValidation/PopPupWarning';
import PopPup from 'modules/Retirement955/pages/DataValidation/popPup/PopPup';
import { Loading } from 'global/components/v1/Loading';
import Header from 'modules/shared/components/Header';
import GridContactInformation from 'modules/Retirement955/pages/DataValidation/components/MainSection/GridContactInformation';
import GridBasicInformation from 'modules/Retirement955/pages/DataValidation/components/MainSection/gridInfoBasic/GridBasicInformation';
import { Title } from 'modules/Retirement955/pages/DataValidation/Title';
import CardGray from 'modules/shared/components/CardGrey';
import ErrorMessage from '../../components/ErrorMessage';

function DataValidation() {
	const { profiling, isLoading: isLoadingProfiling, isError: isErrorProfiling } = usePerfilamiento();
	const { affiliate, isLoading: isLoadingAffiliate, isError: isErrorAffiliate } = useAfiliado();
	const { contactInfo } = useContactInfo({
		authenticated: false,
	});

	const error = useGetErrorContactInfo(contactInfo.data);
	const [showModal, setShowModal] = useState(false);
	const [showModalValidation, setShowModalValidation] = useState(false);
	const [messageValidation, setMessageValidation] = useState(null);
	const [redirection, setRedirection] = useState(null);
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

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleShowModalValidation = () => {
		setShowModalValidation(true);
	};

	const handleCloseModalValidation = () => {
		setShowModalValidation(false);
	};

	const goToUpdate = () => {
		window.open(textDataValidation.updateUrl, textDataValidation.targetBlank);
	};

	function getError(e) {
		if (e === 'next') {
			setMessageValidation(error);
			if (error) {
				handleShowModalValidation();
			} else {
				setRedirection(true);
			}
		} else if (e === 'return') {
			setBackRedirection(true);
		}
	}

	if (isLoadingProfiling || contactInfo.loading || isLoadingAffiliate) {
		return <Loading />;
	}

	if (isErrorAffiliate || contactInfo.error || isErrorProfiling) {
		return <ErrorMessage />;
	}

	return (
		<>
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
			<CardGray>
				<CardGray>
					{profiling.regime === profilingValue[0].value && (
						<Header title={textHeader.title} text={textHeader.textReja} />
					)}
					{(profiling.regime === profilingValue[1].value ||
						profiling.regime === profilingValue[2].value ||
						profiling.regime === profilingValue[3].value) && (
						<Header title={textHeader.title} text={textHeader.textLegal} />
					)}
				</CardGray>
			</CardGray>
			<WhiteCard>
				<Title />
				<TableHeading title={textDataValidation.titleBasicInfo} />
				<GridBasicInformation infoBasic={affiliate} />
				<TableHeading title={textDataValidation.titleContactInfo} />
				{selectOptions && selectOptions.phones ? (
					<GridContactInformation dateContact={selectOptions} />
				) : (
					<ErrorMessage />
				)}
				<UpdateContent>
					<TextFinal className='bodyText'>¿Tus datos no son correctos?</TextFinal>
					<a onClick={handleShowModal}>Actualizar datos</a>
				</UpdateContent>
			</WhiteCard>
			<MediaQuery maxDeviceWidth={375}>
				<Paginator widthB='120px' heightB='45px' onClick={getError} />
			</MediaQuery>
			<MediaQuery minDeviceWidth={376}>
				<Paginator widthB='138px' heightB='45px' onClick={getError} />
			</MediaQuery>
			{ReactDOM.createPortal(
				<>
					<MediaQuery maxDeviceWidth={1023}>
						<PopPup
							widthB='170px'
							heightB='45px'
							marginT='30px'
							marginB='40px'
							justifyContent='center'
							onClose={handleCloseModal}
							show={showModal}
							onClick={goToUpdate}
							hideButtonCancel={true}
							nameButton='Actualizar datos'
						/>
					</MediaQuery>
					<MediaQuery minDeviceWidth={1023}>
						<PopPup
							widthB='170px'
							heightB='45px'
							marginT='30px'
							marginB='40px'
							justifyContent='center'
							onClose={handleCloseModal}
							hideButtonCancel={true}
							show={showModal}
							onClick={goToUpdate}
							nameButton='Actualizar datos'
						/>
					</MediaQuery>
				</>,
				document.getElementById('modal')
			)}
			{redirection && profiling.regime === profilingValue[0].value && (
				<Redirect to='/proceso95-5/validation-ruc'></Redirect>
			)}
			{redirection &&
				(profiling.regime === profilingValue[1].value ||
					profiling.regime === profilingValue[2].value ||
					profiling.regime === profilingValue[3].value) && <Redirect to='/proceso95-5/homeAdvice'></Redirect>}
			{backRedirection && <Redirect to='/proceso95-5/validation-prerequisites'></Redirect>}
		</>
	);
}

export default DataValidation;
