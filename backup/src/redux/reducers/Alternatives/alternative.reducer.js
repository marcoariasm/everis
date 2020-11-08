import { alternativeConstants } from '../../constants/alternative.constants';
import SharedModule from 'modules/shared/index'
import { path } from 'ramda'


const { libs: {AppSession} } = SharedModule;


export default function alternatives(state, action) {
    switch(action.type) {
        case 'CHANGE_PERCENTAGE':
            return {
                ...state,
                alternatives: {
                    ...state.alternatives,
                    retirementPension: {
                        "deferredLifeAnnuity": path(['response', 'deferredLifeAnnuity'], action),
                        "deliveryAmount": path(['response', 'deliveryAmount'], action),
                        "familyLifeAnnuity": path(['response', 'familyLifeAnnuity'], action),
                        "pensionAmount": path(['response', 'pensionAmount'], action),
                        "scheduledWithdrawal": path(['response', 'scheduledWithdrawal'], action),
                        "temporaryRent": path(['response', 'temporaryRent'], action)
                }
                }
            }
        case alternativeConstants.PERCENTAGE_25:
            return {
                ...state,
                alternatives: {
                    ...state.alternatives,
                    retirementPension: {
                        25: {
                            "deferredLifeAnnuity": action.response.deferredLifeAnnuity,
                            "deliveryAmount": action.response.deliveryAmount,
                            "familyLifeAnnuity": action.response.familyLifeAnnuity,
                            "pensionAmount": action.response.pensionAmount,
                            "scheduledWithdrawal": action.response.scheduledWithdrawal,
                            "temporaryRent": action.response.temporaryRent
                        }
                    }
                }
            }
        case alternativeConstants.PERCENTAGE_50:
            return {
                ...state,
                    alternatives: {
                        ...state.alternatives,
                        retirementPension: {
                            50: {
                                "deferredLifeAnnuity": action.response.deferredLifeAnnuity,
                                "deliveryAmount": action.response.deliveryAmount,
                                "familyLifeAnnuity": action.response.familyLifeAnnuity,
                                "pensionAmount": action.response.pensionAmount,
                                "scheduledWithdrawal": action.response.scheduledWithdrawal,
                                "temporaryRent": action.response.temporaryRent
                            }
                        }
                    }
                }
            case alternativeConstants.PERCENTAGE_75:
                 return {
                    ...state,
                    alternatives: {
                        ...state.alternatives,
                        retirementPension: {
                            5: {
                                "deferredLifeAnnuity": action.response.deferredLifeAnnuity,
                                "deliveryAmount": action.response.deliveryAmount,
                                "familyLifeAnnuity": action.response.familyLifeAnnuity,
                                "pensionAmount": action.response.pensionAmount,
                                "scheduledWithdrawal": action.response.scheduledWithdrawal,
                                "temporaryRent": action.response.temporaryRent
                                }
                            }
                        }
                    }
            case alternativeConstants.PERCENTAGE_955:
                return {
                     ...state,
                    alternatives: {
                        ...state.alternatives,
                        retirement955: {
                            "deferredLifeAnnuity": path(['response', 'deferredLifeAnnuity'], action),
                            "deliveryAmount": path(['response', 'deliveryAmount'], action),
                            "familyLifeAnnuity": path(['response', 'familyLifeAnnuity'], action),
                            "pensionAmount": path(['response', 'pensionAmount'], action),
                            "scheduledWithdrawal": path(['response', 'scheduledWithdrawal'], action),
                            "temporaryRent": path(['response', 'temporaryRent'], action)
                                        
                        }
                    }
                }

        default:
            console.log('initialState:', action)
    }
}

