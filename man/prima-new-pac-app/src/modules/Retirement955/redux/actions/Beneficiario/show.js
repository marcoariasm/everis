export const BENEFICIARIO_SHOW_ERROR = 'BENEFICIARIO_SHOW_ERROR';
export const BENEFICIARIO_SHOW_LOADING = 'BENEFICIARIO_SHOW_LOADING';
export const BENEFICIARIO_SHOW_SUCCESS = 'BENEFICIARIO_SHOW_SUCCESS';
export const BENEFICIARIO_SHOW_START = 'BENEFICIARIO_SHOW_START';

export const error = (payload) => ({
  type: BENEFICIARIO_SHOW_ERROR,
  error: payload,
});

export const loading = (payload) => ({
  type: BENEFICIARIO_SHOW_LOADING,
  loading: payload,
});

export const retrieved = (payload) => ({
  type: BENEFICIARIO_SHOW_SUCCESS,
  data: payload,
});

export const startBeneficiario = () => ({
  type: BENEFICIARIO_SHOW_START,
});
