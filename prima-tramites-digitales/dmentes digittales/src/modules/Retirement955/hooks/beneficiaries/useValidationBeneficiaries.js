import { useState } from 'react';
import moment from 'moment';
import { includes, isNil, prop } from 'ramda';

import { addBeneficiary } from 'modules/Retirement955/constants/ConstAddBeneficiary';
import { typeDocument } from 'modules/shared/constant/ParametersValidation';

const useValidationBeneficiaries = (affiliateInfo, infoIni, store, validationCustom) => {
	const [customValidation, setCustomValidation] = useState(null);
	const [customValidationPrev, setCustomValidationPrev] = useState(validationCustom);
	let currentDay = moment().format('YYYY-MM-DD');

	const BirthGreatherThanCurrent = (benReceived) => {
		const daysDifference = moment(currentDay).diff(moment(benReceived.birthdate), 'days');
		const res = daysDifference < 0;

		if (res) {
			setCustomValidation(addBeneficiary.customValidation['BirthGreatherThanCurrent']);
			if (!isNil(validationCustom)) if (includes('fecha', validationCustom)) setCustomValidationPrev(null);
		} else {
			setCustomValidation(null);
		}

		return res;
	};

	const checkIfExistSamePerson = (benReceived, isEdition) => {
		let beforeBeneficiary = {
			documentNumber: infoIni.documentNumber,
		};

		let benReceivedFormated = {
			documentNumber: benReceived.documentNumber,
		};

		let arrayBeneficiaries = store.dataBeneficery.map((ben) => {
			return {
				documentNumber: ben.documentNumber,
			};
		});

		let exist = false;

		exist = arrayBeneficiaries.some((ben) => {
			return ben.documentNumber === benReceivedFormated.documentNumber;
		});

		if (isEdition && JSON.stringify(beforeBeneficiary) === JSON.stringify(benReceivedFormated)) {
			exist = false;
		} else if (isEdition && JSON.stringify(beforeBeneficiary) !== JSON.stringify(benReceivedFormated)) {
			exist = arrayBeneficiaries.some((ben, ind) => {
				return ben.documentNumber === benReceivedFormated.documentNumber && infoIni.index !== ind;
			});
		}

		if (exist) {
			setCustomValidation(addBeneficiary.customValidation['samePerson']);
		} else {
			setCustomValidation(null);
		}
		return exist;
	};

	const Children15YearsMin = (benReceived) => {
		const AfiliatebirthDay = moment(
			moment(
				affiliateInfo.birthDate.split('/')[2] + '-' + affiliateInfo.birthDate.split('/')[1] + '-' + affiliateInfo.birthDate.split('/')[0]
			).format('YYYY-MM-DD')
		);

		const yearsDifference = moment(benReceived.birthdate).diff(AfiliatebirthDay, 'years');
		const res = yearsDifference < 15 && benReceived.relationship === '17';

		if (res) {
			setCustomValidation(addBeneficiary.customValidation['Children15YearsMin']);
			if (!isNil(validationCustom)) if (includes('fecha', validationCustom)) setCustomValidationPrev(null);
		} else {
			setCustomValidation(null);
		}
		return res;
	};

	const ChildrenAgeMaxMinYearsOld = (benReceived) => {
		let age = parseInt(moment().diff(benReceived.birthdate, 'years', true));

		const res = age >= 18 && benReceived.relationship === '17' && benReceived.disability === '21';

		if (res) {
			setCustomValidation(addBeneficiary.customValidation['ChildrenAgeMaxMinYearsOld']);
			if (!isNil(validationCustom)) if (includes('fecha', validationCustom)) setCustomValidationPrev(null);
		} else {
			setCustomValidation(null);
		}

		return res;
	};

	const CoupleOver15YearsOld = (benReceived) => {
		let age = parseInt(moment().diff(benReceived.birthdate, 'years', true));

		const res = age < 15 && (benReceived.relationship === '15' || benReceived.relationship === '16');

		if (res) {
			console.log(validationCustom);
			setCustomValidation(addBeneficiary.customValidation['CoupleOver15YearsOld']);
			if (!isNil(validationCustom)) if (includes('fecha', validationCustom)) setCustomValidationPrev(null);
		} else {
			setCustomValidation(null);
		}

		return res;
	};

	const hasCouples = (benReceived, isEdition) => {
		let hasError = false;

		let hasCouple = store.dataBeneficery.filter((ben, i) => ben?.relationship === '15' || ben?.relationship === '16').length > 0;

		if (isEdition && JSON.stringify(infoIni) !== JSON.stringify(benReceived)) {
			hasCouple =
				store.dataBeneficery.filter((ben, i) => infoIni.index !== i && (ben?.relationship === '15' || ben?.relationship === '16')).length >
				0;
		}

		if ((benReceived.relationship === '15' || benReceived.relationship === '16') && hasCouple) {
			hasError = true;
		}

		if (isEdition && hasCouple) {
			hasError = false;
		}

		if (hasError) {
			setCustomValidation(addBeneficiary.customValidation['hasParentsCuople']);
		} else {
			setCustomValidation(null);
		}
		return hasError;
	};

	const hasParents = (benReceived, isEdition) => {
		let hasError = false;

		let hasFather = store.dataBeneficery.filter((ben, i) => ben?.relationship === '18' && ben?.gender === '20').length > 0;
		let hasMother = store.dataBeneficery.filter((ben, i) => ben?.relationship === '18' && ben?.gender === '19').length > 0;

		if (isEdition && JSON.stringify(infoIni) !== JSON.stringify(benReceived)) {
			hasFather =
				store.dataBeneficery.filter((ben, i) => infoIni.index !== i && ben?.relationship === '18' && ben?.gender === '20').length > 0;
			hasMother =
				store.dataBeneficery.filter((ben, i) => infoIni.index !== i && ben?.relationship === '18' && ben?.gender === '19').length > 0;
		}

		if (benReceived.relationship === '18' && benReceived?.gender === '20' && hasFather) {
			hasError = true;
		}
		if (benReceived.relationship === '18' && benReceived?.gender === '19' && hasMother) {
			hasError = true;
		}

		if (isEdition && (hasMother || hasFather)) {
			hasError = false;
		}

		if (hasError) {
			setCustomValidation(addBeneficiary.customValidation['hasParents']);
		} else {
			setCustomValidation(null);
		}
		return hasError;
	};

	const Parents15YearsOlderThan = (benReceived) => {
		let affiliateBirthDate = moment(moment(affiliateInfo.birthDate).format('YYYY-MM-DD'));
		let beneficiarieBirthDate = moment(moment(benReceived.birthdate).format('YYYY-MM-DD'));

		const yearsDifference = affiliateBirthDate.diff(beneficiarieBirthDate, 'years');
		const isParent = benReceived.relationship === '18';
		const res = yearsDifference < 15 && isParent;

		if ((yearsDifference < 0 && isParent) || (yearsDifference === 0 && isParent)) {
			setCustomValidation('La fecha de nacimiento de los padres no pueden ser mayor o igual que la del afiliado');
			if (!isNil(validationCustom)) if (includes('fecha', validationCustom)) setCustomValidationPrev(null);
			return true;
		}

		if (res) {
			setCustomValidation(addBeneficiary.customValidation['Parents15YearsOlderThan']);
			if (!isNil(validationCustom)) if (includes('fecha', validationCustom)) setCustomValidationPrev(null);
		} else {
			setCustomValidation(null);
		}

		return res;
	};

	const validDocumentForMinors = (benReceived) => {
		let age = parseInt(moment().diff(benReceived.birthdate, 'years', true));

		const hasError = benReceived.documentType === prop('type', typeDocument[3]) && age >= 18;

		if (hasError) {
			setCustomValidation(addBeneficiary.customValidation['hasCorrectAgeForDocument']);
			if (!isNil(validationCustom)) if (includes('fecha', validationCustom)) setCustomValidationPrev(null);
		} else {
			setCustomValidation(null);
		}

		return hasError;
	};

	const ValidSexOfConcubine = (benReceived) => {
		const hasError =
			((affiliateInfo.gender === 'MALE' && benReceived.gender !== '19') ||
				(affiliateInfo.gender === 'FEMALE' && benReceived.gender !== '20')) &&
			(benReceived.relationship === '16' || benReceived.relationship === '15');

		if (hasError) {
			setCustomValidation(addBeneficiary.customValidation['hasCorrectSex']);
		} else {
			setCustomValidation(null);
		}

		return hasError;
	};

	return [
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
	];
};

export default useValidationBeneficiaries;
