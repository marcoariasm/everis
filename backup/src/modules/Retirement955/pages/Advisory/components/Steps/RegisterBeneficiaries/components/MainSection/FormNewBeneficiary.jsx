import React, { useState, useEffect, memo } from 'react'
import moment from 'moment'

//redux
import { useSelector } from 'react-redux'

//Components
import GlobalModule from 'global'

import Select from 'global/components/v1/Select/Select'
import { Title, Card, FailData, ContentForm, GridAddBeneficiary } from './CardAddBeneficiary'
import { textRegBeneficiaries } from 'modules/Retirement955/constants/ConstantRegisterBeneficiaries'
import Modal from 'global/components/v1/Modal'
import Input from 'global/components/v1/Input/Input'
import { validateText } from 'modules/shared/helpers/HelperForm'
import Botonera from './BtnSaveCancel'
import { addBeneficiary, initialValues } from 'modules/Retirement955/constants/ConstAddBeneficiary'
import {
	isEmpty,
	prop,
	propEq,
	assoc,
	keys,
	map,
	allPass,
	findIndex,
	values,
	mapObjIndexed,
	pipe,
	applySpec,
} from 'ramda'
import styled from 'styled-components'

const { Alert } = GlobalModule.components.v1

let currentDay = moment().format('YYYY-MM-DD')

const AlertContainer = styled.div`
	padding: 0px 2.2rem;
	@media only screen and (max-width: 49.9em) {
		padding: 0 1rem 0 0.8rem;
	}
`
const addDefaultOptionSelect = (list) => [{ label: 'Seleccionar', value: '' }, ...list]

const parseObjectToSelect = pipe(
	mapObjIndexed((val, key) => ({
		label: val,
		value: key,
	})),
	values,
	addDefaultOptionSelect
)
const parseDocumentTypeToSelect = pipe(
	map(applySpec({ label: prop('description'), value: prop('type') })),
	addDefaultOptionSelect
)

const FormNewBeneficiary = ({
	modal,
	setAddBeneficiary,
	setListBeneficiaries,
	infoIni,
	setEditBenef,
	listBeneficiaries,
	affiliateInfo,
	listDocumentsTypes,
	genders,
	relationShips,
}) => {
	const isEdition = () => !isEmpty(prop('documentNumber', infoIni)) || !isEmpty(prop('beneficiaryId', infoIni))
	let focus = 'surname'
	const [validation, setValidation] = useState({})
	const [customValidation, setCustomValidation] = useState(null)
	const [datos, setDatos] = useState(infoIni)
	const [showModal, setShowModal] = useState(modal)

	//REDUX
	const store = useSelector((state) => state.advisor)

	useEffect(() => {
		if (modal) setShowModal(modal)
		return () => {
			setEditBenef(initialValues)
			clearForm()
			setShowModal(false)
		}
	}, [])

	const validate = () => {
		const errors = {}
		addBeneficiary.validation.forEach((object) => {
			Object.keys(datos).forEach((item, i) => {
				if (item === object.value) {
					if (!Object.values(datos)[i]) {
						errors[item] = object.label
					}
				}
			})
		})
		const keysErrors = Object.keys(errors)
		if (keysErrors.length) {
			focus = keysErrors[0]
		}
		return errors
	}

	const handleCloseModal = () => {
		setShowModal(false)
		setAddBeneficiary(() => false)
	}

	const clearForm = () => {
		setDatos(initialValues)
		setValidation({})
		setShowModal(false)
	}

	const handleOnchange = (e) => {
		const { name, value } = e.target
		const validate = validateText(e, datos)
		if (validate) {
			setDatos({
				...datos,
				[name]: value,
			})
		}
	}

	const getFocus = () => {
		document.getElementById(focus).focus()
	}

	const hasFormError = () => {
		if (!isEmpty(keys(validate()))) {
			getFocus()
			setValidation(validate())
			return true
		}
		return false
	}

	//Custom Validations
	const checkDocumentTypeLength = (type) => {
		switch (type) {
			case 'DNI':
				return 9
			default:
				return null
		}
	}

	const checkIfExistSamePerson = (benReceived, isEdition) => {
		let beforeBeneficiary = {
			documentType: infoIni.documentType,
			documentNumber: infoIni.documentNumber,
		}

		let benReceivedFormated = {
			documentType: benReceived.documentType,
			documentNumber: benReceived.documentNumber,
		}

		let arrayBeneficiaries = store.dataBeneficery.map((ben) => {
			return {
				documentType: ben.documentType,
				documentNumber: ben.documentNumber,
			}
		})

		let exist = false

		exist = arrayBeneficiaries.some((ben) => {
			return (
				ben.documentType === benReceivedFormated.documentType &&
				ben.documentNumber === benReceivedFormated.documentNumber
			)
		})

		if (isEdition && JSON.stringify(beforeBeneficiary) === JSON.stringify(benReceivedFormated)) {
			exist = false
		} else if (isEdition && JSON.stringify(beforeBeneficiary) !== JSON.stringify(benReceivedFormated)) {
			exist = arrayBeneficiaries.some((ben, ind) => {
				return (
					ben.documentType === benReceivedFormated.documentType &&
					ben.documentNumber === benReceivedFormated.documentNumber &&
					infoIni.index !== ind
				)
			})
		}

		if (exist) {
			setCustomValidation(addBeneficiary.customValidation['samePerson'])
		} else {
			setCustomValidation(null)
		}
		return exist
	}

	const Children15YearsMin = (benReceived) => {
		const AfiliatebirthDay = moment(
			moment(
				affiliateInfo.birthDate.split('/')[2] +
					'-' +
					affiliateInfo.birthDate.split('/')[1] +
					'-' +
					affiliateInfo.birthDate.split('/')[0]
			).format('YYYY-MM-DD')
		)

		const yearsDifference = moment(benReceived.birthdate).diff(AfiliatebirthDay, 'years')
		const res = yearsDifference < 15 && benReceived.relationship === 'CHILD'

		if (res) {
			setCustomValidation(addBeneficiary.customValidation['Children15YearsMin'])
		} else {
			setCustomValidation(null)
		}
		return res
	}

	const Parents15YearsOlderThan = (benReceived) => {
		const AfiliatebirthDay = moment(
			moment(
				affiliateInfo.birthDate.split('/')[2] +
					'-' +
					affiliateInfo.birthDate.split('/')[1] +
					'-' +
					affiliateInfo.birthDate.split('/')[0]
			).format('YYYY-MM-DD')
		)
		const yearsDifference = AfiliatebirthDay.diff(moment(benReceived.birthdate), 'years')
		const isParent = benReceived.relationship === 'PARENT'
		const res = yearsDifference < 15 && isParent

		if ((yearsDifference < 0 && isParent) || (yearsDifference === 0 && isParent)) {
			setCustomValidation('La fecha de nacimiento de los padres no pueden ser mayor o igual que la del afiliado')
			return true
		}

		if (res) {
			setCustomValidation(addBeneficiary.customValidation['Parents15YearsOlderThan'])
		} else {
			setCustomValidation(null)
		}

		return res
	}

	const CoupleOver15YearsOld = (benReceived) => {
		let hoy = new Date()
		let birthDate = new Date(benReceived.birthdate)
		let age = hoy.getFullYear() - birthDate.getFullYear()
		let diferenciaMeses = hoy.getMonth() - birthDate.getMonth()
		if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < birthDate.getDate())) {
			age--
		}

		const res = age < 15 && (benReceived.relationship === 'SPOUSE' || benReceived.relationship === 'CONCUBINE')

		if (res) {
			setCustomValidation(addBeneficiary.customValidation['CoupleOver15YearsOld'])
		} else {
			setCustomValidation(null)
		}

		return res
	}

	const ChildrenAgeMaxMinYearsOld = (benReceived) => {
		let hoy = new Date()
		let birthDate = new Date(benReceived.birthdate)
		let age = hoy.getFullYear() - birthDate.getFullYear()
		let diferenciaMeses = hoy.getMonth() - birthDate.getMonth()
		if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < birthDate.getDate())) {
			age--
		}

		const res = age >= 18 && benReceived.relationship === 'CHILD' && benReceived.hasDisability === 'false'

		if (res) {
			setCustomValidation(addBeneficiary.customValidation['ChildrenAgeMaxMinYearsOld'])
		} else {
			setCustomValidation(null)
		}

		return res
	}

	const BirthGreatherThanCurrent = (benReceived) => {
		const daysDifference = moment(currentDay).diff(moment(benReceived.birthdate), 'days')
		const res = daysDifference < 0

		if (res) {
			setCustomValidation(addBeneficiary.customValidation['BirthGreatherThanCurrent'])
		} else {
			setCustomValidation(null)
		}

		return res
	}

	const hasParents = (benReceived, isEdition) => {
		let hasError = false

		let hasFather =
			store.dataBeneficery.filter(
				(ben, i) => ben?.relationship?.toUpperCase() === 'PARENT' && ben?.gender === 'MALE'
			).length > 0
		let hasMother =
			store.dataBeneficery.filter(
				(ben, i) => ben?.relationship?.toUpperCase() === 'PARENT' && ben?.gender === 'FEMALE'
			).length > 0

		if (isEdition && JSON.stringify(infoIni) !== JSON.stringify(benReceived)) {
			hasFather =
				store.dataBeneficery.filter(
					(ben, i) =>
						infoIni.index !== i && ben?.relationship?.toUpperCase() === 'PARENT' && ben?.gender === 'MALE'
				).length > 0
			hasMother =
				store.dataBeneficery.filter(
					(ben, i) =>
						infoIni.index !== i && ben?.relationship?.toUpperCase() === 'PARENT' && ben?.gender === 'FEMALE'
				).length > 0
		}

		if (benReceived.relationship === 'PARENT' && benReceived?.gender === 'MALE' && hasFather) {
			hasError = true
		}
		if (benReceived.relationship === 'PARENT' && benReceived?.gender === 'FEMALE' && hasMother) {
			hasError = true
		}

		if (isEdition && JSON.stringify(infoIni) === JSON.stringify(benReceived)) {
			hasError = false
		}

		if (hasError) {
			setCustomValidation(addBeneficiary.customValidation['hasParents'])
		} else {
			setCustomValidation(null)
		}
		return hasError
	}

	const hasCouples = (benReceived, isEdition) => {
		let hasError = false

		let hasCouple =
			store.dataBeneficery.filter(
				(ben, i) =>
					ben?.relationship?.toUpperCase() === 'SPOUSE' || ben?.relationship?.toUpperCase() === 'CONCUBINE'
			).length > 0

		if (isEdition && JSON.stringify(infoIni) !== JSON.stringify(benReceived)) {
			hasCouple =
				store.dataBeneficery.filter(
					(ben, i) =>
						infoIni.index !== i &&
						(ben?.relationship?.toUpperCase() === 'SPOUSE' || ben?.relationship?.toUpperCase() === 'CONCUBINE')
				).length > 0
		}

		if ((benReceived.relationship === 'SPOUSE' || benReceived.relationship === 'CONCUBINE') && hasCouple) {
			hasError = true
		}

		if (isEdition && JSON.stringify(infoIni) === JSON.stringify(benReceived)) {
			hasError = false
		}

		if (hasError) {
			setCustomValidation(addBeneficiary.customValidation['hasParentsCuople'])
		} else {
			setCustomValidation(null)
		}
		return hasError
	}

	const updateBeneficiary = (beneficiaryData) => {
		const elementIndex = findIndex(
			allPass([
				propEq('beneficiaryId', prop('beneficiaryId', infoIni)),
				propEq('documentNumber', prop('documentNumber', infoIni)),
			]),
			listBeneficiaries
		)
		return values(assoc(elementIndex, beneficiaryData, listBeneficiaries))
	}

	const onAcceptClicked = () => {
		if (hasFormError()) return

		//intercept for custom validations
		if (checkIfExistSamePerson(datos, isEdition())) return
		if (Children15YearsMin(datos)) return
		if (hasParents(datos, isEdition())) return
		if (hasCouples(datos, isEdition())) return
		if (Parents15YearsOlderThan(datos)) return
		if (BirthGreatherThanCurrent(datos)) return
		if (CoupleOver15YearsOld(datos)) return
		if (ChildrenAgeMaxMinYearsOld(datos)) return

		const getNewBeneficiariesList = () => {
			datos.birthDate = datos.birthdate // ToDo remove lowercase birthdate
			return isEdition() ? updateBeneficiary(datos) : [...listBeneficiaries, datos]
		}
		setListBeneficiaries(getNewBeneficiariesList())
		clearForm()
	}

	const onCancelClicked = () => {
		clearForm()
	}

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
									color={validation?.surname ? '1.5px solid #FF0000' : 'none'}
									maxLength='40'
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
									color={validation?.motherSurname ? '1.5px solid #FF0000' : 'none'}
									maxLength='40'
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
									color={validation?.firstName ? '1.5px solid #FF0000' : 'none'}
									maxLength='40'
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
									color={validation?.secondName ? '1.5px solid #FF0000' : 'none'}
									maxLength='40'
								/>
							</span>
							{validation?.secondName ? <FailData>{validation?.secondName}</FailData> : <FailData />}
						</Card>
						<Card>
							<span className='valueFormTitle'>{textRegBeneficiaries.beneficiary[4].value}</span>
							<span>
								<Select
									id='documentType'
									options={parseDocumentTypeToSelect(listDocumentsTypes)}
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
									color={validation?.documentNumber ? '1.5px solid #FF0000' : 'none'}
									maxLength={checkDocumentTypeLength(datos.documentType)}
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
									width='127px'
									name='birthdate'
									value={datos.birthdate}
									onChange={handleOnchange}
									color={validation?.birthdate ? '1.5px solid #FF0000' : 'none'}
									maxLength='40'
									min='1900-01-01'
									max={currentDay}
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
									id='hasDisability'
									options={addBeneficiary.condition}
									width='156px'
									name='hasDisability'
									value={datos.hasDisability}
									onChange={handleOnchange}
									color={validation?.hasDisability ? '1.5px solid #FF0000' : 'none'}
								/>
							</span>
							{validation?.hasDisability ? <FailData>{validation?.hasDisability}</FailData> : <FailData />}
						</Card>
					</GridAddBeneficiary>
				</div>
			</ContentForm>
			{customValidation && (
				<AlertContainer>
					<Alert type='error' message={customValidation} hasImage={false} fontSize='13px' />
				</AlertContainer>
			)}

			<Botonera
				onAccepted={onAcceptClicked}
				onCanceled={onCancelClicked}
				closeModal={handleCloseModal}
				marginR='17px'
			/>
		</Modal>
	)
}

export default memo(FormNewBeneficiary)
