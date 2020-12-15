import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import * as ReactReduxHook from 'modules/shared/utils/react-redux-hooks';
import Agenda from './index';

describe('Test a la vista de Agenda', () => {
  let wrapper;
  let useEffect;
  let store;
  let useDispatch;
  let useSelector;
  let psyUseRef;

  const advisors = {
    advisors: [
      {
        advisorId: 1,
        names: 'Jose Luis',
        fatherLastName: 'García',
        motherLastName: 'Lopez',
        email: 'jlgarcia@gmail.com',
        minimunAmount: 100001.00,
        maximunAmount: 200000.00,
        annes: 'annex',
        area: 'area',
        procedure: 'Jubilacion por edad legal',
      },
    ],
  };

  const docType = {
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

    psyUseRef = jest.fn();

    useSelector = await jest
      .spyOn(ReactReduxHook, 'useSelector')
      .mockImplementation(() => store.getState());

    useDispatch = await jest
      .spyOn(ReactReduxHook, 'useDispatch')
      .mockImplementation(() => store.dispatch);

    fetch.resetMocks();
    fetch.doMockIf(/^.*DOCUMENT_TYPE.*$/, JSON.stringify(docType));
    fetch.doMockIf(/^.*advisor.*$/, JSON.stringify(advisors));

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/agenda']}>
          <Agenda />
        </MemoryRouter>
      </Provider>,
    );

    await act(async () => wrapper);
    wrapper.update();
  });

  test('Test al combo Documento de Identidad existe en <Agenda />', () => {
    expect(wrapper.find('select[name="doc-identidad"]').exists()).toBe(true);
  });

  test('Test al input Cuspp existe en <Agenda />', () => {
    expect(wrapper.find('input[name="cuspp"]').exists()).toBe(true);
  });

  test('Test al input Cuspp debe cambiar valor <Agenda />', () => {
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

  test('Test al input N° documento existe en <Agenda />', () => {
    expect(wrapper.find('input[name="numero-documento"]').exists()).toBe(true);
  });

  test('Test al input N° documento debe cambiar valor <Agenda />', () => {
    wrapper.find('input[name="numero-documento"]').simulate('input', {
      target: {
        value: '51753904',
        validity: {
          valid: true,
        },
        type: 'text',
        name: 'numero-documento',
      },
    });
    expect(wrapper.find('input[name="numero-documento"]').prop('value')).toEqual('51753904');
  });

  test('Test al input Fecha solicitud existe en <Agenda />', () => {
    expect(wrapper.find('input[name="fecha-solicitud"]').exists()).toBe(true);
  });

  test('Test al input Fecha solicitud debe cambiar valor <Agenda />', () => {
    wrapper.find('input[name="fecha-solicitud"]').simulate('change', {
      target: {
        value: '51753904',
      },
    });
    expect(wrapper.find('input[name="fecha-solicitud"]').prop('value')).toEqual('51753904');
  });

  test('Test al combo Tramite existe en <Agenda />', () => {
    expect(wrapper.find('select[name="tramite"]').exists()).toBe(true);
  });

  test('Test al combo Canal de atención existe en <Agenda />', () => {
    expect(wrapper.find('select[name="canal"]').exists()).toBe(true);
  });

  test('Test al input Asesor existe en <Agenda />', async () => {
    expect(wrapper.find('input[name="asesor"]').exists()).toBe(true);
  });

  test('Test al input Asesor debe cambiar valor <Agenda />', () => {
    wrapper.find('input[name="fecha-solicitud"]').simulate('change', {
      target: {
        value: advisors.advisors[0].names,
      },
    });
    expect(wrapper.find('input[name="fecha-solicitud"]').prop('value')).toEqual(advisors.advisors[0].names);
  });
});
