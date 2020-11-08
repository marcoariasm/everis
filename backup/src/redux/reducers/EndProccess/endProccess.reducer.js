import { endProccessConstants } from '../../constants/endProccessConstants'

export default function endProccess(state, action) {
    switch(action.type){
        case ADVISOR_ID_DOCUMENT:
            return {
            ...state,
            storageId: action.payload
        }
        case endProccessConstants.UNEMPLOYMENT_CONDITION_DECLARATION:
            return {
                ...state,
                unemployment: action.payload,
            }
        }    
        
}
