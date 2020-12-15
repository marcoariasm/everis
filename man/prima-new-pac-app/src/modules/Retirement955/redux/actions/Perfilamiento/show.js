export const PERFILAMIENTO_SHOW_ERROR = 'PERFILAMIENTO_SHOW_ERROR';
export const PERFILAMIENTO_SHOW_LOADING = 'PERFILAMIENTO_SHOW_LOADING';
export const PERFILAMIENTO_SHOW_SUCCESS = 'PERFILAMIENTO_SHOW_SUCCESS';
export const PERFILAMIENTO_SHOW_START = 'PERFILAMIENTO_SHOW_START';
export const PERFILAMIENTO_SHOW_RESET = 'PERFILAMIENTO_SHOW_RESET';

export const error = (payload) => ({
  type: PERFILAMIENTO_SHOW_ERROR,
  error: payload,
});

export const loading = (payload) => ({
  type: PERFILAMIENTO_SHOW_LOADING,
  loading: payload,
});

export const retrieved = (payload) => ({
  type: PERFILAMIENTO_SHOW_SUCCESS,
  data: payload,
});

export const startPerfilamiento = () => ({
  type: PERFILAMIENTO_SHOW_START,
});

export const reset = () => ({
  type: PERFILAMIENTO_SHOW_RESET,
});
