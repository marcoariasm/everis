import {
    PROCEDURES_REQUEST,
    SELECT_PROCEDURE,
    ADD_COMMENT_TO_NEW_REQUEST,
    ADD_BENEFICIARY_TO_NEW_REQUEST,
    DELETE_BENEFICIARY_FROM_NEW_REQUEST,
    EDIT_BENEFICIARY_FROM_NEW_REQUEST,
    DELETE_ALL_BENEFICIARIES,
    REPLACE_ALL_BENEFICIARIES,
    SET_SELECTED_BENEFICIARIES
} from 'redux/types/Procedures';

import { addNewBeneficiary } from '../Affiliate';

export const PROCEDURES_request = (procedures) => ({
    type: PROCEDURES_REQUEST,
    payload: procedures
});

export const SELECT_procedure = (procedure) => ({
    type: SELECT_PROCEDURE,
    payload: procedure
});

export const ADD_COMMENT_TO_NEW_request = (comment) => ({
    type: ADD_COMMENT_TO_NEW_REQUEST,
    payload: comment
});

export const ADD_BENEFICIARY_TO_NEW_request = (beneficiary) => {
    function addBenefyciaryToState() {
        return { type: ADD_BENEFICIARY_TO_NEW_REQUEST, payload: beneficiary };
    }
    return async (dispatch) => {
        dispatch(addBenefyciaryToState());
        dispatch(addNewBeneficiary(beneficiary));
    }
};

export const ADD_BENEFICIARY_OWN_request = (beneficiary) => {
    function addBenefyciaryToState() {
        return { type: ADD_BENEFICIARY_TO_NEW_REQUEST, payload: beneficiary };
    }
    return async (dispatch) => {
        dispatch(addBenefyciaryToState());
    }
};

export const DELETE_BENEFICIARY_FROM_NEW_request = (index) => ({
    type: DELETE_BENEFICIARY_FROM_NEW_REQUEST,
    payload: index
});

export const EDIT_BENEFICIARY_FROM_NEW_request = (payload) => ({
    type: EDIT_BENEFICIARY_FROM_NEW_REQUEST,
    payload
})

export const DELETE_ALL_beneficiaries = () => ({
    type: DELETE_ALL_BENEFICIARIES
})

export const REPLACE_ALL_beneficiaries = (payload) => ({
    type: REPLACE_ALL_BENEFICIARIES,
    payload
})

export const SET_SELECTED_beneficiaries = (payload) => ({
    type: SET_SELECTED_BENEFICIARIES,
    payload
})


