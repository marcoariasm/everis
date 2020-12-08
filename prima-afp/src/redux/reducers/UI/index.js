
import {UI_SET_ERROR,UI_CLEAR_ERROR,UI_START_LOADING,UI_STOP_LOADING} from './../../types/UI';

const initState = {
    loading:false,
    error: ''
}

export default (state = initState, action) => {
    switch(action.type){
        case UI_SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case UI_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case UI_START_LOADING:
            return {
                ...state,
                loading: true
            }
        case UI_STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}