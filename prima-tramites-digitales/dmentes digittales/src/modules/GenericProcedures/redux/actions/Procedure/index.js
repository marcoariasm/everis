export const setPersons = (data) => {
    return {
        type: 'SET_PERSONS',
        payload: data
    }
}

export const setStatementBeneficiary = (data) => {
    return {
        type: 'SET_BENEFICIARY_STATEMENT',
        payload: data
    }
}

export const setCodeAsessment = (data) => {
    return {
        type: 'SET_CODE_ASESSMENT',
        payload: data
    }
}

export const setCodeProcedure = (data) => {
    return {
        type: 'SET_CODE_PROCEDURE',
        payload: data
    }
}

export const setComment = (data) => {
    return {
        type: 'SET_REQUEST_DETAIL',
        payload: data
    }
}

export const setCellphone = (data) => {
    return {
        type: 'SET_CELLPHONE',
        payload: data
    }
}

export const setEmail = (data) => {
    return {
        type: 'SET_EMAIL',
        payload: data
    }
}

export const setAsessment = (data) => {
    return {
        type: 'SET_ID_ASESSMENT',
        payload: data
    }
}

export const addFile = (data) => {
    return {
        type: 'SET_UPLOAD_FILE',
        payload: data
    }
}

export const addFileBeneficiary = (data) => {
    return {
        type: 'SET_UPLOAD_FILE_BENEFICIARY',
        payload: data
    }
}
