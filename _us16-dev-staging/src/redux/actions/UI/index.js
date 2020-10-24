import {UI_SET_ERROR,UI_CLEAR_ERROR,UI_START_LOADING,UI_STOP_LOADING} from './../../types/UI';

export const UI_SetError = (err) => ({
    type: UI_SET_ERROR,
    payload: err
});
export const UI_ClearError = () => ({
    type: UI_CLEAR_ERROR
});
export const UI_StartLoading = () => ({
    type: UI_START_LOADING
});
export const UI_StopLoading = () => ({
    type: UI_STOP_LOADING
});


