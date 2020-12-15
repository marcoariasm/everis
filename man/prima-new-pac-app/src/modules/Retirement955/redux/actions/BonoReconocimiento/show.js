export const BONO_RECONOCIMIENTO_SHOW_ERROR = 'BONO_RECONOCIMIENTO_SHOW_ERROR';
export const BONO_RECONOCIMIENTO_SHOW_LOADING = 'BONO_RECONOCIMIENTO_SHOW_LOADING';
export const BONO_RECONOCIMIENTO_SHOW_SUCCESS = 'BONO_RECONOCIMIENTO_SHOW_SUCCESS';
export const BONO_RECONOCIMIENTO_SHOW_START = 'BONO_RECONOCIMIENTO_SHOW_START';
export const BONO_RECONOCIMIENTO_SHOW_RESET = 'BONO_RECONOCIMIENTO_SHOW_RESET';

export const error = (payload) => ({
  type: BONO_RECONOCIMIENTO_SHOW_ERROR,
  error: payload,
});

export const loading = (payload) => ({
  type: BONO_RECONOCIMIENTO_SHOW_LOADING,
  loading: payload,
});

export const retrieved = (payload) => ({
  type: BONO_RECONOCIMIENTO_SHOW_SUCCESS,
  data: payload,
});

export const startBonoReconocimiento = () => ({
  type: BONO_RECONOCIMIENTO_SHOW_RESET,
});

export const reset = () => ({
  type: BONO_RECONOCIMIENTO_SHOW_RESET,
});
