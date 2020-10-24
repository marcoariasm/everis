import { combineReducers } from "redux";
import advisor from './Advisor';
import auth from './Auth';
import ui from './UI';

export default combineReducers({
  advisor,
  auth,
  ui
});