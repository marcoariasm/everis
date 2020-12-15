export const AFILIADO_SHOW_ERROR = 'AFILIADO_SHOW_ERROR';
export const AFILIADO_SHOW_LOADING = 'AFILIADO_SHOW_LOADING';
export const AFILIADO_SHOW_SUCCESS = 'AFILIADO_SHOW_SUCCESS';
export const AFILIADO_SHOW_START = 'AFILIADO_SHOW_START';

export const error = (payload) => ({
  type: AFILIADO_SHOW_ERROR,
  error: payload,
});

export const loading = (payload) => ({
  type: AFILIADO_SHOW_LOADING,
  loading: payload,
});

export const retrieved = (payload) => ({
  type: AFILIADO_SHOW_SUCCESS,
  data: payload,
});

export const startAfiliado = (data) => ({
  type: AFILIADO_SHOW_START,
  data,
});
