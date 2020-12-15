import { combineReducers } from 'redux';
import constants from '../../constants/financialAdviceStatementUpdate.constants';

export function error(state = null, action) {
  switch (action.type) {
    case constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_FAILURE:
      return action.error;

    case constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_RESET:
      return null;

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_LOADING:
      return action.loading;

    case constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_RESET:
      return false;

    default:
      return state;
  }
}

export function success(state = null, action) {
  switch (action.type) {
    case constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_SUCCESS:
      return {};

    case constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_RESET:
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  error, loading, success,
});
