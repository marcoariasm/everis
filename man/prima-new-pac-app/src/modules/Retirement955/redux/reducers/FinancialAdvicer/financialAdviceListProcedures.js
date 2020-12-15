import { combineReducers } from 'redux';
import constants from '../../constants/financialAdviceListProcedures.constants';

export function error(state = null, action) {
  switch (action.type) {
    case constants.FINANCIAL_ADVICE_LIST_PROCEDURES_FAILURE:
      return action.error;

    case constants.FINANCIAL_ADVICE_LIST_PROCEDURES_RESET:
      return null;

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case constants.FINANCIAL_ADVICE_LIST_PROCEDURES_LOADING:
      return action.loading;

    case constants.FINANCIAL_ADVICE_LIST_PROCEDURES_RESET:
      return false;

    default:
      return state;
  }
}

export function success(state = {}, action) {
  switch (action.type) {
    case constants.FINANCIAL_ADVICE_LIST_PROCEDURES_SUCCESS:
      return action.response;

    case constants.FINANCIAL_ADVICE_LIST_PROCEDURES_RESET:
      return {};

    default:
      return state;
  }
}

export default combineReducers({
  error, loading, success,
});
