import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT, AUTH_LOAD_DOCUMENTS_TYPES } from 'redux/types/Auth'

const initialState = {
  documentsTypes: [],
  contactInfo: [],
  form: {},
  user: null,
  error: '',
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        form: action.payload,
        user: null,
        error: '',
        isLoading: true,
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        form: {},
        user: action.payload,
        error: '',
        isLoading: false,
      }
    case AUTH_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
        isLoading: false,
      }
    case AUTH_LOAD_DOCUMENTS_TYPES:
      return {
        ...state,
        documentsTypes: action.payload,
        user: null,
        error: '',
        isLoading: false,
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        form: {},
        user: null,
        error: '',
        isLoading: false,
      }
    default:
      return state
  }
}
