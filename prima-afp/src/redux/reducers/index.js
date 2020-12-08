import { combineReducers } from "redux";
import advisor from './Advisor';
import auth from './Auth';
import ui from './UI';
import affiliate from './Affiliate/affiliate.reducer';
import procedure from '../../modules/GenericProcedures/redux/reducers/Procedure';
import procedures from '../reducers/Procedures';

export default combineReducers({
  advisor,
  auth,
  ui,
  procedure,
  procedures,
  affiliate
});