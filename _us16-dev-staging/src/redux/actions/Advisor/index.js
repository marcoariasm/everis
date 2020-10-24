//types
import {
  ADVISOR_UI_SET_MESSAGE,
  ADVISOR_UI_SET_LOADING,
  ADVISOR_SET_DATA_NEW_BENEFICERY,
  ADVISOR_SET_DJ_NO_BENEFICIARY,
  ADVISOR_SET_VIEW_VIDEO,
  ADVISOR_SET_PENSIONER,
  ADVISOR_SET_CHECK_NO_RUC,
} from "./../../types/Advisor";

export const setDjNoBeneficiary = (payload) => ({
  type: ADVISOR_SET_DJ_NO_BENEFICIARY,
  payload,
});

export const setViewVideo = (payload) => ({
  type: ADVISOR_SET_VIEW_VIDEO,
  payload,
});
export const setDjPensioner = (payload) => ({
  type: ADVISOR_SET_PENSIONER,
  payload,
});

export const setDataBeneficery = (payload) => ({
  type: ADVISOR_SET_DATA_NEW_BENEFICERY,
  payload,
});

export const setCheckNoRuc = (payload) => ({
  type: ADVISOR_SET_CHECK_NO_RUC,
  payload,
});

//Ui action
export const setUILoading = (payload) => ({
  type: ADVISOR_UI_SET_LOADING,
  payload,
});
export const setUIMessage = (payload) => ({
  type: ADVISOR_UI_SET_MESSAGE,
  payload,
});
