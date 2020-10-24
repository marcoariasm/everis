import { 
    ADVISOR_UI_SET_MESSAGE,
    ADVISOR_UI_SET_LOADING,
    ADVISOR_SET_DATA_NEW_BENEFICERY,
    ADVISOR_SET_DJ_NO_BENEFICIARY,
    ADVISOR_SET_VIEW_VIDEO,
    ADVISOR_SET_PENSIONER,
    ADVISOR_SET_CHECK_NO_RUC
  } from "./../../types/Advisor";

  const initialState = {
      afiliado: {},
      beneficiaries: [],
      djNoBeneficiaries: false,
      viewVideo: false,
      pensioner: null,
      dataBeneficery:[],
      checkNoRuc: null
  }

  export default (state = initialState, action) => {
    switch (action.type) {
        case ADVISOR_UI_SET_MESSAGE:
          return {
            ...state,
            uiMessage: action.payload,
          }
        case ADVISOR_UI_SET_LOADING:
          return {
            ...state,
            uiLoading: action.payload,
          }
        case ADVISOR_SET_DATA_NEW_BENEFICERY:
          return {
            ...state,
            dataBeneficery: action.payload,
          }
        case ADVISOR_SET_DJ_NO_BENEFICIARY:
          return {
            ...state,
            djNoBeneficiaries: action.payload,
          }
        case ADVISOR_SET_VIEW_VIDEO:
          return {
            ...state,
            viewVideo: action.payload,
          }
        case ADVISOR_SET_PENSIONER:
          return {
            ...state,
            pensioner: action.payload,
          }
        case ADVISOR_SET_CHECK_NO_RUC:
          return {
            ...state,
            checkNoRuc: action.payload,
          }
        default:
          return state
      }
  }