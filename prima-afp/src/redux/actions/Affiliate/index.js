import { DashboardService } from "modules/Dashboard/services/DashboardService";

import {
  AFFILIATE_REQUEST,
  AFFILIATE_SUCCESS,
  AFFILIATE_FAILURE,
  AFFILIATE_EMPTY,
} from "redux/types/Affiliate";

export const affiliateActions = {
  validateAffiliate,
  restoreEmptyAffiliate,
};

function restoreEmptyAffiliate() {
  function affiliateEmpty(payload) {
    return { type: AFFILIATE_EMPTY, payload: payload };
  }
  return async (dispatch) => {
    dispatch(affiliateEmpty());
  };
}

function validateAffiliate(documentType, documentNumber, birthdate) {
  const dashboardService = new DashboardService();

  function request() {
    return { type: AFFILIATE_REQUEST };
  }

  function success(payload) {
    return { type: AFFILIATE_SUCCESS, payload: payload };
  }

  function failure(error) {
    return { type: AFFILIATE_FAILURE, payload: error };
  }

  return async (dispatch) => {
    dispatch(request());

    dashboardService
      .validateAffiliate(documentType, documentNumber, birthdate)
      .then((response) => {
        if (response) {
          if (response.errorCode) {
            let error = "";
            error = response.errorMessage;
            dispatch(failure(error));
            return;
          }
          dispatch(success(response));
        }
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        throw new Error(error);
      });
  };
}
