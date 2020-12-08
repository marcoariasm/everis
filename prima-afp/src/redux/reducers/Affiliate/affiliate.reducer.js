import {
  AFFILIATE_REQUEST,
  AFFILIATE_SUCCESS,
  AFFILIATE_FAILURE,
  AFFILIATE_EMPTY
} from "redux/types/Affiliate";

const initialState = {
  affiliate: null,
  error: "",
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AFFILIATE_EMPTY:
      return {
        ...state,
        affiliate: null,
        error: "",
        isLoading: false,
      };
    case AFFILIATE_REQUEST:
      return {
        ...state,
        affiliate: null,
        error: "",
        isLoading: true,
      };
    case AFFILIATE_SUCCESS:
      return {
        ...state,
        affiliate: action.payload,
        error: "",
        isLoading: false,
      };
    case AFFILIATE_FAILURE:
      return {
        ...state,
        affiliate: null,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
