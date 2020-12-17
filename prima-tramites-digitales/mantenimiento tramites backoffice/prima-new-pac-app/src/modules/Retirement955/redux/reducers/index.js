import { combineReducers } from 'redux';

import prueba from './Prueba';
import afiliado from './Afiliado';
import beneficiario from './Beneficiario';
import bonoReconocimiento from './BonoReconocimiento';
import perfilamento from './Perfilamiento';
import financialAdvice from './FinancialAdvicer';

const reducer = combineReducers({
  prueba,
  afiliado,
  beneficiario,
  bonoReconocimiento,
  perfilamento,
  financialAdvice,
});

export default reducer;
