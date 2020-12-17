import constants from '../../constants/financialAdviceListProcedures.constants';
import service from '../../services/financialAdviceListProcedures.service';

export function load(loading) {
  return {
    type: constants.FINANCIAL_ADVICE_LIST_PROCEDURES_LOADING,
    loading,
  };
}

export function success(response) {
  return {
    type: constants.FINANCIAL_ADVICE_LIST_PROCEDURES_SUCCESS,
    response,
  };
}

export function failure(error) {
  return {
    type: constants.FINANCIAL_ADVICE_LIST_PROCEDURES_FAILURE,
    error,
  };
}

export function getProcedures(query) {
  return (dispatch) => {
    dispatch(load(true));

    service(query)
      .then((response) => {
        dispatch(success(response));
        dispatch(load(false));
      })
      .catch((error) => {
        dispatch(failure(error));
        dispatch(load(false));
        return Error(error);
      });
  };
}

export const reset = () => ({
  type: constants.FINANCIAL_ADVICE_LIST_PROCEDURES_RESET,
});
