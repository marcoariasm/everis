//Services
import { addBeneficiaryService } from './../../services/beneficiaries.service';

import { filter, isEmpty, map, pipe } from 'ramda';

//types
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
} from './../../types/Advisor';

import { UNEMPLOYMENT_CONDITION_DECLARATION } from '../../types/EndProccess';
import { ADVISOR_RESET_STORE } from '../../types/Advisor';

export const AdvisorActions = {
	SendBeneficiaryReg,
};

export const setDjNoBeneficiary = (payload) => ({
	type: ADVISOR_SET_DJ_NO_BENEFICIARY,
	payload,
});

export const setViewVideo = (payload) => ({
	type: ADVISOR_SET_VIEW_VIDEO,
	payload,
});
export const setDjPensioner = (payload) => ({
	type: ADVISOR_SET_PENSIONER,
	payload,
});

export const setDataBeneficery = (payload) => ({
	type: ADVISOR_SET_DATA_NEW_BENEFICERY,
	payload,
});

export const setCheckNoRuc = (payload) => ({
	type: ADVISOR_SET_CHECK_NO_RUC,
	payload,
});

export const setFinancialAdviceReceived = (payload) => ({
	type: ADVISOR_SET_FINANCIAL_ADVICE_RECEIVED,
	payload,
});

export const Advisor_ClearData = () => ({
	type: ADVISOR_CLEAR_DATA,
});

export const setIdDocument = (payload) => ({
	type: ADVISOR_ID_DOCUMENT,
	payload,
});

export const setUnemployment = (payload) => ({
	type: UNEMPLOYMENT_CONDITION_DECLARATION,
	payload,
});

//Actions for beneficiary register
function SendBeneficiaryReg() {
	return async (dispatch, getstate) => {
		const { dataBeneficery } = getstate().advisor;
		dispatch(Advisor_StartBeneficiaryReg());

		let beneficieriesPromise = pipe(
			filter((beneficiary) => isEmpty(beneficiary.beneficiaryId)),
			map((beneficiary) => addBeneficiaryService(beneficiary))
		)(dataBeneficery);

		Promise.all(beneficieriesPromise)
			.then((res) => {
				dispatch(Advisor_SucessBeneficiaryReg(res));
				dispatch(Advisor_StopBeneficiaryReg());
			})
			.catch((error) => {
				//error.message,error.stack
				dispatch(Advisor_ErrorBeneficiaryReg(error.message));
				dispatch(Advisor_StopBeneficiaryReg());
				return;
			});
	};
}

const Advisor_StartBeneficiaryReg = () => ({
	type: ADVISOR_START_BENEFICIARY_REGISTRATION,
});

const Advisor_StopBeneficiaryReg = () => ({
	type: ADVISOR_STOP_BENEFICIARY_REGISTRATION,
});

const Advisor_SucessBeneficiaryReg = (payload) => ({
	type: ADVISOR_SUCCESSFUL_BENEFICIARY_REGISTRATION,
	payload,
});
const Advisor_ErrorBeneficiaryReg = (payload) => ({
	type: ADVISOR_ERROR_BENEFICIARIES_REGISTRATION,
	payload,
});

export const Advisor_ResetStore = () => ({
	type: ADVISOR_RESET_STORE,
});

export const setSelectedBeneficiares = (payload) => ({
	type: ADVISOR_SELECTED_BENEFICIARIES,
	payload,
});

export const setIdSelectedBeneficiares = (payload) => ({
	type: ADVISOR_ID_SELECTED_BENEFICIARIES,
	payload,
});
