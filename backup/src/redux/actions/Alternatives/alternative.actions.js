import {alternativeConstants} from '../../constants/alternative.constants'
import {alternativeService} from '../../services/alternatives.service'

export const alternativeActions = {
    setPercentage
}

function setPercentage(percentage) {
   function request(percentage) {
        return {
            type: alternativeConstants.ALTERNATIVE_REQUEST,
            percentage
        }
    }

    function success(percentage) {
        return {
            type: alternativeConstants.ALTERNATIVE_SUCCESS,
            percentaje
        }
    }
    
    function failure(error) {
        return {
            type: alternativeConstants.ALTERNATIVE_FAILURE,
            error
        }
    }
}

