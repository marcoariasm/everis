import {
	PROCEDURES_REQUEST,
	SELECT_PROCEDURE,
	ADD_COMMENT_TO_NEW_REQUEST,
	ADD_BENEFICIARY_TO_NEW_REQUEST,
	DELETE_BENEFICIARY_FROM_NEW_REQUEST,
	EDIT_BENEFICIARY_FROM_NEW_REQUEST,
	DELETE_ALL_BENEFICIARIES,
	REPLACE_ALL_BENEFICIARIES,
	SET_SELECTED_BENEFICIARIES,
	SET_ID_SELECTED_BENEFICIARIES,
} from 'redux/types/Procedures';

const initialState = {
	proceduresList: [],
	selectedProcedure: null,
	newRequest: {
		typeRequestId: 1,
		typeTaskId: '1',
		affiliateId: '1',
		applicantId: '',
		comment: '',
		beneficiaries: [],
		documents: [],
		user: '',
	},
	selectedBeneficiaries: [],
	idSelectedBeneficiaries: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case PROCEDURES_REQUEST:
			return {
				...state,
				proceduresList: action.payload,
			};
		case SELECT_PROCEDURE:
			return {
				...state,
				selectedProcedure: action.payload,
			};
		case ADD_COMMENT_TO_NEW_REQUEST:
			return {
				...state,
				newRequest: {
					...state.newRequest,
					comment: action.payload,
				},
			};
		case ADD_BENEFICIARY_TO_NEW_REQUEST:
			return {
				...state,
				newRequest: {
					...state.newRequest,
					beneficiaries: [...state.newRequest.beneficiaries, action.payload],
				},
			};
		case DELETE_BENEFICIARY_FROM_NEW_REQUEST:
			const completeList = [...state.newRequest.beneficiaries];
			completeList.splice(action.payload, 1);
			return {
				...state,
				newRequest: {
					...state.newRequest,
					beneficiaries: [...completeList],
				},
			};
		case EDIT_BENEFICIARY_FROM_NEW_REQUEST:
			const list = [...state.newRequest.beneficiaries];
			const newBeneficiary = list[action.payload.index];
			list.splice(action.payload.index, 1, {
				...newBeneficiary,
				representative: { ...newBeneficiary.representative, ...action.payload.formState },
			});
			return {
				...state,
				newRequest: {
					...state.newRequest,
					beneficiaries: [...list],
				},
			};
		case DELETE_ALL_BENEFICIARIES:
			return {
				...state,
				newRequest: {
					...state.newRequest,
					beneficiaries: [],
				},
			};
		case REPLACE_ALL_BENEFICIARIES:
			return {
				...state,
				newRequest: {
					...state.newRequest,
					beneficiaries: action.payload,
				},
			};
		case SET_SELECTED_BENEFICIARIES:
			return {
				...state,
				selectedBeneficiaries: action.payload,
			};
		case SET_ID_SELECTED_BENEFICIARIES:
			return {
				...state,
				idSelectedBeneficiaries: action.payload,
			};
		default:
			return state;
	}
};
