import { combineReducers } from 'redux';

import financialAdviceStatementUpdate from './financialAdviceStatementUpdate';
import listProcedures from './financialAdviceListProcedures';

export default combineReducers({
  financialAdviceStatementUpdate,
  listProcedures,
});
