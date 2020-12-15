import constants from '../../constants/financialAdviceStatementUpdate.constants';
import service from '../../services/financialAdviceStatementUpdate.service';

function load(loading) {
  return {
    type: constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_LOADING,
    loading,
  };
}

function success(response) {
  return {
    type: constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_SUCCESS,
    response,
  };
}

function failure(error) {
  return {
    type: constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_FAILURE,
    error,
  };
}

export function updatedStatement(financialAdviceId, body) {
  return (dispatch) => {
    dispatch(load(true));

    service(financialAdviceId, body)
    .then((response) => {
      dispatch(success(response));
      dispatch(load(false));
    })
    .catch((error) => {
      dispatch(failure(error.toString()));
      dispatch(load(false));
      return Error(error);
    })
  }
};

export const reset = () => ({
  type: constants.FINANCIAL_ADVICE_STATEMENT_UPDATE_RESET,
});
