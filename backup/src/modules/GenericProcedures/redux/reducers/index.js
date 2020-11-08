import { combineReducers } from "redux";
import detailReducer from "./Detail/index";
import uploadFileReducer from './Documents';

export const allReducers = combineReducers({
  detailReducer: detailReducer,
  fileReducer: uploadFileReducer
});
