import { combineReducers } from 'redux';

export function error(state = null, action) {
  switch (action.type) {
    case 'BENEFICIARIO_SHOW_ERROR':
      return action.error;

    case 'BENEFICIARIO_SHOW_RESET':
      return null;

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'BENEFICIARIO_SHOW_LOADING':
      return action.loading;

    case 'BENEFICIARIO_SHOW_RESET':
      return false;

    default:
      return state;
  }
}

export function data(state = [], action) {
  switch (action.type) {
    case 'BENEFICIARIO_SHOW_SUCCESS':
      return action.data;

    case 'BENEFICIARIO_SHOW_RESET':
      return [];

    default:
      return state;
  }
}

export default combineReducers({
  error, loading, data,
});
