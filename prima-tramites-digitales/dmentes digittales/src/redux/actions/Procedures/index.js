import {
    PROCEDURES_REQUEST,
    SELECT_PROCEDURE,
    ADD_COMMENT_TO_NEW_REQUEST,
    ADD_BENEFICIARY_TO_NEW_REQUEST,
    DELETE_BENEFICIARY_FROM_NEW_REQUEST,
    EDIT_BENEFICIARY_FROM_NEW_REQUEST,
    DELETE_ALL_BENEFICIARIES
} from 'redux/types/Procedures';

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

export const ADD_BENEFICIARY_TO_NEW_request = (beneficiary) => ({
    type: ADD_BENEFICIARY_TO_NEW_REQUEST,
    payload: beneficiary
});

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


