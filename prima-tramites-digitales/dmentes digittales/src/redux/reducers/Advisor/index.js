import {
	ADVISOR_SET_DATA_NEW_BENEFICERY,
	ADVISOR_SET_DJ_NO_BENEFICIARY,
	ADVISOR_SET_VIEW_VIDEO,
	ADVISOR_SET_PENSIONER,
	ADVISOR_SET_CHECK_NO_RUC,
	ADVISOR_SET_FINANCIAL_ADVICE_RECEIVED,
	ADVISOR_CLEAR_DATA,
	ADVISOR_ID_DOCUMENT,
	ADVISOR_SELECTED_BENEFICIARIES,
	ADVISOR_ID_SELECTED_BENEFICIARIES,
	ADVISOR_START_BENEFICIARY_REGISTRATION,
	ADVISOR_STOP_BENEFICIARY_REGISTRATION,
	ADVISOR_SUCCESSFUL_BENEFICIARY_REGISTRATION,
	ADVISOR_ERROR_BENEFICIARIES_REGISTRATION,
	ADVISOR_RESET_STORE,
} from './../../types/Advisor';

import { UNEMPLOYMENT_CONDITION_DECLARATION } from '../../types/EndProccess';

const initialState = {
	afiliado: {},
	beneficiariesRegInProgress: false,
	beneficiariesRegSuccessMessage: null,
	beneficiariesRegErrorMessage: null,
	beneficiaries: [],
	djNoBeneficiaries: false,
	viewVideo: false,
	idDocument: null,
	selectedBeneficiaries: [],
	idSelectedBeneficiaries: [],
	pensioner: null,
	dataBeneficery: [],
	checkNoRuc: null,
	financialAdviceReceived: null,
	unemployment: false,
	storageId: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADVISOR_SET_DATA_NEW_BENEFICERY:
			return {
				...state,
				dataBeneficery: action.payload,
			};
		case ADVISOR_SET_DJ_NO_BENEFICIARY:
			return {
				...state,
				djNoBeneficiaries: action.payload,
			};
		case ADVISOR_SET_VIEW_VIDEO:
			return {
				...state,
				viewVideo: action.payload,
			};
		case ADVISOR_SET_PENSIONER:
			return {
				...state,
				pensioner: action.payload,
			};
		case ADVISOR_SET_CHECK_NO_RUC:
			return {
				...state,
				checkNoRuc: action.payload,
			};
		case ADVISOR_SET_FINANCIAL_ADVICE_RECEIVED:
			return {
				...state,
				financialAdviceReceived: action.payload,
			};
		case ADVISOR_SELECTED_BENEFICIARIES:
			return {
				...state,
				selectedBeneficiaries: action.payload,
			};
		case ADVISOR_ID_SELECTED_BENEFICIARIES:
			return {
				...state,
				idSelectedBeneficiaries: action.payload,
			};
		case ADVISOR_START_BENEFICIARY_REGISTRATION:
			return {
				...state,
				beneficiariesRegErrorMessage: null,
				beneficiariesRegSuccessMessage: null,
				beneficiariesRegInProgress: true,
			};
		case ADVISOR_STOP_BENEFICIARY_REGISTRATION:
			return {
				...state,
				beneficiariesRegInProgress: false,
			};
		case ADVISOR_SUCCESSFUL_BENEFICIARY_REGISTRATION:
			return {
				...state,
				beneficiariesRegErrorMessage: null,
				beneficiariesRegSuccessMessage: action.payload,
			};
		case ADVISOR_ERROR_BENEFICIARIES_REGISTRATION:
			return {
				...state,
				beneficiariesRegErrorMessage: action.payload,
				beneficiariesRegSuccessMessage: null,
			};
		case ADVISOR_CLEAR_DATA:
			return initialState;
		case ADVISOR_ID_DOCUMENT:
			return {
				...state,
				idDocument: action.payload,
			};
		case ADVISOR_RESET_STORE:
			return {
				...state,
				beneficiariesRegInProgress: false,
				beneficiariesRegSuccessMessage: null,
				beneficiariesRegErrorMessage: null,
				beneficiaries: [],
			};
		case UNEMPLOYMENT_CONDITION_DECLARATION:
			return {
				...state,
				unemployment: action.payload,
			};

		case ADVISOR_ID_DOCUMENT:
			return {
				...state,
				storageId: action.payload,
			};

		default:
			return state;
	}
};
