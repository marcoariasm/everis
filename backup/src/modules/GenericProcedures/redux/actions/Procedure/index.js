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
