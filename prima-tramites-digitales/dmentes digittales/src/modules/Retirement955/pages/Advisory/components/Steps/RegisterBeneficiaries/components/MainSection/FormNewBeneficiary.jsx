import React, { useState, useEffect, memo } from 'react';
import moment from 'moment';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { textRegBeneficiaries } from 'modules/Retirement955/constants/ConstantRegisterBeneficiaries';
import { fieldValidationConstraint, typeDocument } from 'modules/shared/constant/ParametersValidation';

import useValidationBeneficiaries from 'modules/Retirement955/hooks/beneficiaries/useValidationBeneficiaries';

import {
	formValidationInput,
	getStringLengthPart,
	validateDate,
	validateText,
	validatedDocumentType,
} from 'modules/shared/helpers/HelperForm';

//Components
import Select from 'global/components/v1/Select/Select';
import { Title, Card, FailData, ContentForm, GridAddBeneficiary } from './CardAddBeneficiary';
import Modal from 'global/components/v1/Modal';
import Input from 'global/components/v1/Input/Input';
import Botonera from './BtnSaveCancel';
import { addBeneficiary, initialValues } from 'modules/Retirement955/constants/ConstAddBeneficiary';
import { isEmpty, prop, propEq, assoc, keys, map, allPass, findIndex, values, pipe, applySpec, concat } from 'ramda';
import styled from 'styled-components';

import Alert from 'global/components/v1/Alert/Alert';

let yesterDay = moment().subtract(1, 'days').format('YYYY-MM-DD');

const AlertContainer = styled.div`
	padding: 0px 2.2rem;
	@media only screen and (max-width: 49.9em) {
		padding: 0 1rem 0 0.8rem;
	}
`;
const addDefaultOptionSelect = (list) => [{ label: 'Seleccionar', value: '' }, ...list];

const parseObjectToSelect = pipe(map(applySpec({ label: prop('value'), value: prop('idParameter') })), addDefaultOptionSelect);

const FormNewBeneficiary = ({
	affiliateInfo,
	conditionDisability,
	genders,
	infoIni,
	listBeneficiaries,
	listDocumentsTypes,
	modal,
	relationShips,
	selectBenef,
	setAddBeneficiary,
	setEditBenef,
	setListBeneficiaries,
	setSelectedBeneficiares,
}) => {
	const isEdition = () => !isEmpty(prop('documentNumber', infoIni)) || !isEmpty(prop('beneficiaryId', infoIni));
	let focus = 'surname';
	const [validation, setValidation] = useState({});
	const [datos, setDatos] = useState(infoIni);
	const [showModal, setShowModal] = useState(modal);
	const [customValidation2, setCustomValidation2] = useState(null);

	//REDUX
	const store = useSelector((state) => state.advisor);
	const dispatch = useDispatch();

	const [
		customValidation,
		customValidationPrev,
		BirthGreatherThanCurrent,
		checkIfExistSamePerson,
		ChildrenAgeMaxMinYearsOld,
		Children15YearsMin,
		CoupleOver15YearsOld,
		hasCouples,
		hasParents,
		Parents15YearsOlderThan,
		validDocumentForMinors,
		ValidSexOfConcubine,
	] = useValidationBeneficiaries(affiliateInfo, infoIni, store, customValidation2);

	useEffect(() => {
		if (modal) setShowModal(modal);
		return () => {
			setEditBenef(initialValues);
			clearForm();
			setShowModal(false);
		};
	}, []);

	const validate = () => {
		const errors = {};
		addBeneficiary.validation.forEach((object) => {
			Object.keys(datos).forEach((item, i) => {
				if (item === object.value) {
					if (!Object.values(datos)[i]) {
						errors[item] = object.label;
					}
				}
			});
		});
		const keysErrors = Object.keys(errors);
		if (keysErrors.length) {
			focus = keysErrors[0];
		}

		return errors;
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setAddBeneficiary(() => false);
	};

	const clearForm = () => {
		setDatos(initialValues);
		setValidation({});
		setShowModal(false);
	};

	const handleKeyUp = (e) => {
		let valorNew = e.target.value;

		if (datos.documentType === prop('idParameter', typeDocument[1])) {
			valorNew = valorNew.replace('n', 'N');
		}

		if (e.target.name !== 'documentNumber') {
			valorNew = formValidationInput(valorNew);
		}

		e.target.value = valorNew;
		setDatos({
			...datos,
			[e.target.name]: valorNew,
		});
	};

	const handleOnBlur = (e) => {
		const { name, value } = e.target;

		if (name === 'documentNumber') {
			if (datos.documentType === prop('idParameter', typeDocument[1])) {
				const isCorrect = getStringLengthPart(value);

				if (!isCorrect) {
					setValidation({ documentNumber: 'El número de documento no es correcto.' });
					setCustomValidation2('El número de documento no es correcto.');
					return false;
				} else {
					setValidation({});
					setCustomValidation2(null);
				}
			}
			if (datos.documentType === prop('idParameter', typeDocument[0])) {
				if (value.length !== 8) {
					setValidation({ documentNumber: 'El número de documento debe tener 8 dígitos.' });
					setCustomValidation2('El número de documento debe tener 8 dígitos.');
				} else {
					setValidation({});
					setCustomValidation2(null);
				}
			}
		}

		if (name === 'birthdate') {
			const isCorrect = validateDate(value);

			if (!isCorrect) {
				setValidation({ birthdate: 'La fecha de nacimiento es incorrecta y/o válida.' });
				setCustomValidation2('La fecha de nacimiento es incorrecta y/o válida.');
			} else {
				setValidation({});
				setCustomValidation2(null);
			}
		}

		if (value) {
			setDatos({
				...datos,
				[name]: value.trim(),
			});
		}
	};

	const handleOnchange = (e) => {
		const { name, value } = e.target;
		const validate = validateText(e, datos);

		if (validate) {
			setDatos({
				...datos,
				[name]: value,
			});
		}
	};

	const getFocus = () => {
		document.getElementById(focus).focus();
	};

	const hasFormError = () => {
		if (!isEmpty(keys(validate()))) {
			getFocus();
			setValidation(validate());
			if (!isEmpty(validation)) {
				return false;
			}
			return true;
		}

		return false;
	};

	//Custom Validations
	const checkDocumentTypeLength = (type) => {
		let dataDocument = validatedDocumentType(type);
		return dataDocument;
	};

	const validationInputIsCorrect = () => {
		let isError = true;
		if (isEmpty(validation)) {
			isError = false;
		}

		return isError;
	};

	const updateBeneficiary = (beneficiaryData) => {
		const elementIndex = findIndex(
			allPass([propEq('beneficiaryId', prop('beneficiaryId', infoIni)), propEq('documentNumber', prop('documentNumber', infoIni))]),
			listBeneficiaries
		);
		return values(assoc(elementIndex, beneficiaryData, listBeneficiaries));
	};

	const onAcceptClicked = () => {
		let arrayBen = [];

		if (hasFormError()) return;

		setCustomValidation2(customValidationPrev);

		//intercept for custom validations
		if (checkIfExistSamePerson(datos, isEdition())) return;
		if (Children15YearsMin(datos)) return;
		if (hasParents(datos, isEdition())) return;
		if (hasCouples(datos, isEdition())) return;
		if (Parents15YearsOlderThan(datos)) return;
		if (BirthGreatherThanCurrent(datos)) return;
		if (CoupleOver15YearsOld(datos)) return;
		if (ChildrenAgeMaxMinYearsOld(datos)) return;
		if (ValidSexOfConcubine(datos)) return;
		if (validDocumentForMinors(datos)) return;
		if (validationInputIsCorrect()) return;

		const getNewBeneficiariesList = () => {
			datos.birthDate = datos.birthdate; // ToDo remove lowercase birthdate
			return isEdition() ? updateBeneficiary(datos) : [...listBeneficiaries, datos];
		};
		setListBeneficiaries(getNewBeneficiariesList());

		dispatch(setSelectedBeneficiares(concat(selectBenef, [datos.documentNumber])));

		clearForm();
	};

	const onCancelClicked = () => {
		clearForm();
	};

	return (
		<Modal
			widthMobile='73%'
			maxWidth='887px'
			widthB='170px'
			heightB='45px'
			marginB='40px'
			height='520'
			heightTablet='630'
			heightmobile='610'
			justifyContent='flex-end'
			onClose={handleCloseModal}
			hiddenCloseModal={false}
			show={showModal}
			onClick={onchange}
			label='Entendido'
			hideButtonCancel={true}
			hidden={true}
			hideFooter={true}>
			<Title className='informativeTitleSmall'>{isEdition() ? 'Editar' : 'Añadir'} beneficiarios</Title>
			<ContentForm>
				<div>
					<GridAddBeneficiary>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[0].value}</span>
							<span>
								<Input
									id='surname'
									type='text'
									placeholder='Ingresar apellido'
									name='surname'
									value={datos.surname || ''}
									onChange={handleOnchange}
									onKeyUp={handleKeyUp}
									onBlur={handleOnBlur}
									color={validation?.surname ? '1.5px solid #FF0000' : 'none'}
									maxLength={fieldValidationConstraint.surname.maxLength}
									autoFocus
								/>
							</span>
							{validation?.surname ? <FailData>{validation?.surname}</FailData> : <FailData></FailData>}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[1].value}</span>
							<span>
								<Input
									id='motherSurname'
									type='text'
									width='127px'
									placeholder='Ingresar apellido'
									name='motherSurname'
									value={datos.motherSurname}
									onChange={handleOnchange}
									onKeyUp={handleKeyUp}
									onBlur={handleOnBlur}
									color={validation?.motherSurname ? '1.5px solid #FF0000' : 'none'}
									maxLength={fieldValidationConstraint.motherSurname.maxLength}
								/>
							</span>
							{validation?.motherSurname ? <FailData>{validation?.motherSurname}</FailData> : <FailData />}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[2].value}</span>
							<span>
								<Input
									id='firstName'
									type='text'
									width='127px'
									placeholder='Ingresar nombre'
									name='firstName'
									value={datos.firstName}
									onChange={handleOnchange}
									onKeyUp={handleKeyUp}
									onBlur={handleOnBlur}
									color={validation?.firstName ? '1.5px solid #FF0000' : 'none'}
									maxLength={fieldValidationConstraint.firstName.maxLength}
								/>
							</span>
							{validation?.firstName ? <FailData>{validation?.firstName}</FailData> : <FailData />}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[3].value}</span>
							<span>
								<Input
									id='secondName'
									type='text'
									width='127px'
									placeholder='Ingresar nombre'
									name='secondName'
									value={datos.secondName}
									onChange={handleOnchange}
									onKeyUp={handleKeyUp}
									onBlur={handleOnBlur}
									color={validation?.secondName ? '1.5px solid #FF0000' : 'none'}
									maxLength={fieldValidationConstraint.secondName.maxLength}
								/>
							</span>
							{validation?.secondName ? <FailData>{validation?.secondName}</FailData> : <FailData />}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[4].value}</span>
							<span>
								<Select
									id='documentType'
									options={parseObjectToSelect(listDocumentsTypes)}
									width='156px'
									name='documentType'
									value={datos.documentType}
									onChange={handleOnchange}
									color={validation?.documentType ? '1.5px solid #FF0000' : 'none'}
								/>
							</span>
							{validation?.documentType ? <FailData>{validation?.documentType}</FailData> : <FailData />}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[5].value}</span>
							<span>
								<Input
									id='documentNumber'
									type='text'
									disabled={!datos.documentType}
									width='127px'
									placeholder='Ingresar N˚ de doc.'
									name='documentNumber'
									value={datos.documentNumber}
									onChange={handleOnchange}
									onBlur={handleOnBlur}
									onKeyUp={handleKeyUp}
									color={validation?.documentNumber ? '1.5px solid #FF0000' : 'none'}
									maxLength={checkDocumentTypeLength(datos.documentType).length}
								/>
							</span>
							{validation?.documentNumber ? <FailData>{validation?.documentNumber}</FailData> : <FailData />}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[6].value}</span>
							<span>
								<Input
									id='birthdate'
									type='date'
									placeholder='dd/mm/yyyy'
									format='DD/MM/YYYY'
									name='birthdate'
									value={datos.birthdate}
									onChange={handleOnchange}
									onBlur={handleOnBlur}
									color={validation?.birthdate ? '1.5px solid #FF0000' : 'none'}
									maxLength='40'
									min='1900-01-01'
									max={yesterDay}
								/>
							</span>
							{validation?.birthdate ? <FailData>{validation?.birthdate}</FailData> : <FailData />}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[7].value}</span>
							<span>
								<Select
									id='gender'
									options={parseObjectToSelect(genders)}
									width='156px'
									name='gender'
									value={datos.gender}
									onChange={handleOnchange}
									color={validation?.gender ? '1.5px solid #FF0000' : 'none'}
								/>
							</span>
							{validation?.gender ? <FailData>{validation?.gender}</FailData> : <FailData />}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[8].value}</span>
							<span>
								<Select
									id='relationship'
									options={parseObjectToSelect(relationShips)}
									width='156px'
									name='relationship'
									value={datos?.relationship}
									onChange={handleOnchange}
									color={validation?.relationship ? '1.5px solid #FF0000' : 'none'}
								/>
							</span>
							{validation?.relationship ? <FailData>{validation?.relationship}</FailData> : <FailData />}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[9].value}</span>
							<span>
								<Select
									id='disability'
									options={parseObjectToSelect(conditionDisability)}
									width='156px'
									name='disability'
									value={datos.disability}
									onChange={handleOnchange}
									color={validation?.disability ? '1.5px solid #FF0000' : 'none'}
								/>
							</span>
							{validation?.disability ? <FailData>{validation?.disability}</FailData> : <FailData />}
						</Card>
					</GridAddBeneficiary>
				</div>
			</ContentForm>
			{customValidation && (
				<AlertContainer>
					<Alert type='error' message={customValidation} hasImage={false} fontSize='13px' />
				</AlertContainer>
			)}
			{customValidation2 && (
				<AlertContainer>
					<Alert type='error' message={customValidation2} hasImage={false} fontSize='13px' />
				</AlertContainer>
			)}
			<Botonera onAccepted={onAcceptClicked} onCanceled={onCancelClicked} closeModal={handleCloseModal} marginR='17px' />
		</Modal>
	);
};

export default memo(FormNewBeneficiary);
