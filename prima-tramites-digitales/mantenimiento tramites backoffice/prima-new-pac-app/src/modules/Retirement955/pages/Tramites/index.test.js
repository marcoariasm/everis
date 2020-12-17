import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as ReactReduxHook from 'modules/shared/utils/react-redux-hooks';
import { act } from 'react-dom/test-utils';
import Tramites from './index';

describe('Test a la vista Trámites ', () => {
  let wrapper;
  let useEffect;
  let store;
  let useDispatch;
  let useSelector;

  const typeDocument = {
    '00': 'DNI',
    '01': 'Carnet de extranjerÃa',
    '02': 'Carnet militar o policial',
    '03': 'Libreta de adolescente de trabajo',
    '04': 'Pasaporte',
  };

  const financialAvice = {
    totalItems: 31,
    financialAdvices: [
      {
        advisorAttentionDate: null,
        advisorId: 2,
        affiliate: 'Solano Ramirez Luis Gerardo',
        affiliateId: '954397VQXJ4',
        financialAdviceCode: '1',
        financialAdviceId: 1,
        procedure: 'Jubilación y/o retiro de hasta el 95.5%',
        registrationDate: '2020-09-15',
        sourceChanel: null,
        status: 'REJECTED',
        statusId: 3,
      },
      {
        advisorAttentionDate: null,
        advisorId: 2,
        affiliate: 'Solano Ramirez Luis Gerardo',
        affiliateId: '954397VQXJ4',
        financialAdviceCode: '1',
        financialAdviceId: 1,
        procedure: 'Jubilación y/o retiro de hasta el 95.5%',
        registrationDate: '2020-09-15',
        sourceChanel: null,
        status: 'REJECTED',
        statusId: 3,
      },
    ],
    currentPage: 0,
    totalPages: 4,
  };

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(async () => {
    fetch.resetMocks();
    const mockStore = configureStore([thunk]);
    store = mockStore({
      financialAdvice: {
        listProcedures: {
          error: null,
          loading: false,
          success: financialAvice,
        },
      },
    });

    useEffect = await jest.spyOn(React, 'useEffect');
    mockUseEffect();
    mockUseEffect();

    useSelector = await jest
      .spyOn(ReactReduxHook, 'useSelector')
      .mockImplementation(() => store.getState());

    useDispatch = await jest
      .spyOn(ReactReduxHook, 'useDispatch')
      .mockImplementation(() => store.dispatch);

    wrapper = mount(
      <Provider store={store}>
        <Tramites />
      </Provider>,
    );

    await act(async () => wrapper);
    wrapper.update();
  });

  test('Test al combo Documento de Identidad existe en <Tramites />', async () => {
    fetch.doMockIf(/^.*information?informationGroup.*$/, JSON.stringify(typeDocument));

    wrapper = mount(
      <Provider store={store}>
        <Tramites />
      </Provider>,
    );

    await act(async () => wrapper);
    wrapper.update();
    expect(wrapper.find('select[name="select-doc-identidad"]').exists()).toBe(true);
  });

  test('Test al combo Trámite existe en <Tramites />', () => {
    expect(wrapper.find('select[name="tramite"]').exists()).toBe(true);
  });

  test('Test al combo Estado Trámite existe en <Tramites />', () => {
    expect(wrapper.find('select[name="select-estado-tramite"]').exists()).toBe(true);
  });

  test('Test input CUSPP existe en <Tramites />', () => {
    expect(wrapper.find('input[name="cuspp"]').exists()).toBe(true);
  });

  test('Test al input CUSPP debe cambiar valor <Tramites />', () => {
    wrapper.find('input[name="cuspp"]').simulate('input', {
      target: {
        value: '306987ENMCV1',
        validity: {
          valid: true,
        },
        type: 'text',
        name: 'cuspp',
      },
    });
    expect(wrapper.find('input[name="cuspp"]').prop('value')).toEqual('306987ENMCV1');
  });

  test('Test input N° documento existe en <Tramites />', () => {
    expect(wrapper.find('input[name="documento"]').exists()).toBe(true);
  });

  test('Test al input N° documento debe cambiar valor <Tramites />', () => {
    wrapper.find('input[name="documento"]').simulate('input', {
      target: {
        value: '75064971',
        validity: {
          valid: true,
        },
        type: 'text',
        name: 'documento',
      },
    });
    expect(wrapper.find('input[name="documento"]').prop('value')).toEqual('75064971');
  });

  test('Test input Fecha inicio de registro de tramite existe en <Tramites />', () => {
    expect(wrapper.find('input[name="fechaInicio"]').exists()).toBe(true);
  });

  test('Test al input Fecha inicio de registro de tramite debe cambiar valor <Tramites />', () => {
    wrapper.find('input[name="fechaInicio"]').simulate('change', {
      target: {
        value: '2020-09-24',
      },
    });
    expect(wrapper.find('input[name="fechaInicio"]').prop('value')).toEqual('2020-09-24');
  });

  test('Test input Fecha fin de registro de tramite existe en <Tramites />', () => {
    expect(wrapper.find('input[name="fechaFin"]').exists()).toBe(true);
  });

  test('Test al input Fecha fin de registro de tramite debe cambiar valor <Tramites />', () => {
    wrapper.find('input[name="fechaFin"]').simulate('change', {
      target: {
        value: '2020-09-26',
      },
    });
    expect(wrapper.find('input[name="fechaFin"]').prop('value')).toEqual('2020-09-26');
  });

  test('Test al limpiar los filtros todos los valores regresan a la normalidad', () => {
    console.log(wrapper.find('p[name="clean-filter"]').debug());
  });
});
