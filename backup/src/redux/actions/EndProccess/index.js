//types
import {
    LEGAL_PERSON_DECLARATION,
    ONP_PENSIONER_DECLARATION,
    NO_BENEFICIARIES_DECLARATION,
    UNEMPLOYMENT_CONDITION_DECLARATION
} from '../../types/EndProccess'

export const legalPersonDeclaration = (payload) => ({
    type: LEGAL_PERSON_DECLARATION,
    payload
})

export const onpPensionerDeclaration = (payload) => ({
    type: ONP_PENSIONER_DECLARATION,
    payload
})

export const noBeneficiariesDeclaration = (payload) => ({
    type: NO_BENEFICIARIES_DECLARATION,
    payload
})

export const setUnemployment = (payload) => ({
    type: UNEMPLOYMENT_CONDITION_DECLARATION,
    payload
})