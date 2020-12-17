import { mount } from 'enzyme';
import React from 'react';
import currency from 'currency.js';
import { MemoryRouter, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Asesoria from './index';

const financialAdvice = {
  financialAdviceId: 233,
  financialAdviceCode: '95-5-ASE-0000000233',
  affiliateId: '152857HNXJK5',
  regimeId: 1,
  regime: 'LEGAL_AGE',
  regimeName: 'Edad legal',
  registrationDate: '2020-11-10 09:09:00.297',
  limitDate: '2020-11-12',
  channelCode: 'WEB',
  states: [
    {
      financialAdviceDocumentId: null,
      stateId: 2,
      state: 'REGISTERED',
      stateName: 'Registrado',
      advisorId: null,
      date: '2020-11-10 00:00:00.000',
      reasons: [],
    },
    {
      financialAdviceDocumentId: null,
      stateId: 5,
      state: 'IN_PROCESS',
      stateName: 'En proceso',
      advisorId: 3,
      date: '2020-11-10 00:00:00.000',
      reasons: [],
    },
  ],
  bond: {
    nominalValue: 7929.91,
    updatedValue: 30037.7,
  },
  statements: [
    {
      statement: 'LEGAL_PERSON_DECLARATION',
      accepted: false,
    },
    {
      statement: 'ONP_PENSIONER_DECLARATION',
      accepted: true,
    },
    {
      statement: 'NO_BENEFICIARIES_DECLARATION',
      accepted: false,
    },
    {
      statement: 'UNEMPLOYMENT_CONDITION_DECLARATION',
      accepted: false,
    },
  ],
  cicId: '488203',
  cicBalances: [
    {
      type: 'MANDATORY_PENSIONABLE_PURPOSE',
      fundType: 'FUND_1',
      totalFees: 15496.500286600,
      nominalValue: 394238.29,
      feeValue: 25.440472800,
      feeValueDate: '2019-03-01',
    },
    {
      type: 'VOLUNTARY_PENSIONABLE_PURPOSE',
      fundType: 'FUND_2',
      totalFees: 0,
      nominalValue: 0,
      feeValue: 34.196647800,
      feeValueDate: '2019-03-01',
    },
    {
      type: 'VOLUNTARY_NON_PENSIONABLE_PURPOSE',
      fundType: 'FUND_2',
      totalFees: 0,
      nominalValue: 0,
      feeValue: 34.196647800,
      feeValueDate: '2019-03-01',
    },
  ],
  accumulatedFund: 424275.99,
  validations: [
    {
      financialAdviceValidationId: 157,
      validationId: 2,
      validationCode: '',
      validation: 'DOCUMENTO',
      pending: false,
      validationDate: null,
      advisorId: 3,
    },
    {
      financialAdviceValidationId: 158,
      validationId: 1,
      validationCode: '',
      validation: 'SUNAT',
      pending: false,
      validationDate: null,
      advisorId: 3,
    },
    {
      financialAdviceValidationId: 159,
      validationId: 4,
      validationCode: '',
      validation: 'RENIEC',
      pending: true,
      validationDate: null,
      advisorId: 3,
    },
    {
      financialAdviceValidationId: 160,
      validationId: 3,
      validationCode: '',
      validation: 'CONTACTO',
      pending: true,
      validationDate: null,
      advisorId: 3,
    },
  ],
  simulations: {
    'P-25.0': {
      deliveryAmount: 98559.57,
      pensionAmount: 306624.0,
      scheduledWithdrawal: 1251.24,
      annuity: 1200.11,
      temporaryRent: 2400.22,
      lifePension: null,
    },
    'P-95.5': {
      deliveryAmount: 376497.57,
      pensionAmount: 28686.0,
      scheduledWithdrawal: 108.82,
      annuity: 106.82,
      temporaryRent: 213.65,
      lifePension: null,
    },
    'P-0.0': {
      deliveryAmount: 0.0,
      pensionAmount: 405183.57,
      scheduledWithdrawal: 1656.36,
      annuity: 1587.8,
      temporaryRent: 3175.6,
      lifePension: null,
    },
    'P-75.0': {
      deliveryAmount: 295678.72,
      pensionAmount: 109504.85,
      scheduledWithdrawal: 441.02,
      annuity: 424.73,
      temporaryRent: 849.46,
      lifePension: null,
    },
    'P-50.0': {
      deliveryAmount: 197119.15,
      pensionAmount: 208064.42,
      scheduledWithdrawal: 846.13,
      annuity: 812.42,
      temporaryRent: 1624.84,
      lifePension: null,
    },
  },
};

describe('Asesoria Paso 1', () => {
  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Test componente Asesoria 1 existe ', async () => {
    fetch.mockResponseOnce(JSON.stringify(financialAdvice));

    wrapper = mount(
      <MemoryRouter initialEntries={['/proceso95-5/asesoria/233']}>
        <Route path="/proceso95-5/asesoria/:id">
          <Asesoria />
        </Route>
      </MemoryRouter>,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.steps').exists()).toBe(true);
  });

  test('Validando check identidad de cliente', async () => {
    fetch.mockResponseOnce(JSON.stringify(financialAdvice));

    wrapper = mount(
      <MemoryRouter initialEntries={['/proceso95-5/asesoria/233']}>
        <Route path="/proceso95-5/asesoria/:id">
          <Asesoria />
        </Route>
      </MemoryRouter>,
    );

    await act(async () => wrapper);
    wrapper.update();

    wrapper.find('input[type="checkbox"]').simulate('change', {
      target: {
        value: true,
      },
    });
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true);
  });

  test('Validando clieck siguiente paso - desabilitado', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/proceso95-5/asesoria/233']}>
        <Route path="/proceso95-5/asesoria/:id">
          <Asesoria />
        </Route>
      </MemoryRouter>,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('button[name="save1"]').prop('click'));
    expect(wrapper.find('button[name="save1"]').prop('disabled')).toBe(true);
  });

  test('Validando click siguiente paso - habilitado', async () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/proceso95-5/asesoria/233']}>
        <Route path="/proceso95-5/asesoria/:id">
          <Asesoria />
        </Route>
      </MemoryRouter>,
    );

    await act(async () => wrapper);
    wrapper.update();
    fetch.mockResponseOnce(JSON.stringify({}));

    wrapper.find('input[name="checkboxAsistio"]').simulate('change', {
      target: {
        value: true,
      },
    });
    expect(wrapper.find('input[name="checkboxAsistio"]').prop('checked')).toBe(true);
    wrapper.find('button[name="save1"]').simulate('click');

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('button[name="save1"]').exists()).toBe(false);
    expect(wrapper.find('button[name="next1"]').exists()).toBe(true);
    expect(wrapper.find('button[name="next1"]').prop('disabled')).toBe(false);
    wrapper.find('button[name="next1"]').simulate('click');
    expect(wrapper.find('#asesoria-step-two').exists()).toBe(true);
  });
});

const totalBalance = {
  cuspp: '306987ENMCV1',
  mount: 89456,
  'mount4.5': 4025.52,
  mount95: 85430.48,
};

const next = async (wrapper) => {
  let wrapper2 = wrapper;
  wrapper2 = mount(
    <MemoryRouter initialEntries={['/proceso95-5/asesoria/233']}>
      <Route path="/proceso95-5/asesoria/:id">
        <Asesoria />
      </Route>
    </MemoryRouter>,
  );

  await act(async () => wrapper2);
  wrapper2.update();
  fetch.mockResponseOnce(JSON.stringify({}));
  fetch.mockResponseOnce(JSON.stringify(totalBalance));

  wrapper2.find('input[name="checkboxAsistio"]').simulate('change', {
    target: {
      value: true,
    },
  });
  expect(wrapper2.find('input[name="checkboxAsistio"]').prop('checked')).toBe(true);
  wrapper2.find('button[name="save1"]').simulate('click');

  await act(async () => wrapper2);
  wrapper2.update();
  fetch.mockResponseOnce(JSON.stringify({}));

  expect(wrapper2.find('button[name="save1"]').exists()).toBe(false);
  expect(wrapper2.find('button[name="next1"]').exists()).toBe(true);
  expect(wrapper2.find('button[name="next1"]').prop('disabled')).toBe(false);
  wrapper2.find('button[name="next1"]').simulate('click');

  return wrapper2;
};

describe('Asesoria Paso 2', () => {
  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Test componente Asesoria 2 existe', async () => {
    wrapper = await next(wrapper);
    expect(wrapper.find('#asesoria-step-two').exists()).toBe(true);
  });

  test('Test componente StepTwoTop porcentaje retiro', async () => {
    wrapper = await next(wrapper);
    expect(wrapper.find('.monto-box .retiro').exists()).toBe(true);
    expect(wrapper.find('.monto-box .retiro').text()).toBe('% retiro:');

    expect(wrapper.find('.monto-box .porcentaje').exists()).toBe(true);
    expect(wrapper.find('.monto-box .porcentaje').text()).toBe('95.5%');
  });

  test('Test componente StepTwoTop monto entrega', async () => {
    wrapper = await next(wrapper);

    expect(wrapper.find('.monto-box .text-balance').exists()).toBe(true);
    expect(wrapper.find('.monto-box .text-balance').text()).toBe('Monto de entrega:');

    expect(wrapper.find('.monto-box .balance').exists()).toBe(true);
    expect(wrapper.find('.monto-box .balance').text()).toBe(currency(financialAdvice.accumulatedFund * 0.955, { symbol: '' }).format());
  });

  test('Test componente StepTwoTable existen las 4 columnas', async () => {
    wrapper = await next(wrapper);

    expect(wrapper.find('.table-header .column1').exists()).toBe(true);
    expect(wrapper.find('.table-header .column1').text()).toBe('Producto');

    expect(wrapper.find('.table-header .column2').exists()).toBe(true);
    expect(wrapper.find('.table-header .column2').text()).toBe('Objetivo');

    expect(wrapper.find('.table-header .column3').exists()).toBe(true);
    expect(wrapper.find('.table-header .column3').text()).toBe('Características');

    expect(wrapper.find('.table-header .column4').exists()).toBe(true);
    expect(wrapper.find('.table-header .column4').text()).toBe('Material de soporte');
  });

  test('Test componente StepTwoTop boton Aporte voluntario', async () => {
    wrapper = await next(wrapper);

    expect(wrapper.find('.voluntary-contribution').exists()).toBe(true);
    expect(wrapper.find('.voluntary-contribution').first().text()).toBe('Aporte voluntario sin fin previsional');

    wrapper.find('.voluntary-contribution').first().simulate('click');
  });

  test('Test componente StepTwoTop boton Enviar cartilla 1', async () => {
    wrapper = await next(wrapper);

    expect(wrapper.find('.send-1').exists()).toBe(true);
    expect(wrapper.find('.send-1').first().text()).toBe('Enviar Cartilla');

    wrapper.find('.send-1').first().simulate('click');
  });

  test('Test componente StepTwoTop boton Plan flexible', async () => {
    wrapper = await next(wrapper);

    expect(wrapper.find('.plan-flex').exists()).toBe(true);
    expect(wrapper.find('.plan-flex').first().text()).toBe('Plan flexible');

    wrapper.find('.plan-flex').first().simulate('click');
  });

  test('Test componente StepTwoTop boton Enviar Cartilla 2', async () => {
    wrapper = await next(wrapper);

    expect(wrapper.find('.send-2').exists()).toBe(true);
    expect(wrapper.find('.send-2').first().text()).toBe('Enviar Cartilla');

    wrapper.find('.send-2').first().simulate('click');
  });

  test('Existe titulo Información Productos Prima', async () => {
    wrapper = await next(wrapper);

    expect(wrapper.find('.sub-title.info').exists()).toBe(true);
    expect(wrapper.find('.sub-title.info').first().text()).toBe('Información acerca de los Productos Prima');
  });

  test('Probando afiliado informado', async () => {
    wrapper = await next(wrapper);

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    wrapper.find('input[type="checkbox"]').simulate('change', {
      target: {
        value: true,
      },
    });

    expect(wrapper.find('button[name="save2"]').prop('click'));
    expect(wrapper.find('button[name="save2"]').prop('disabled')).toBe(false);
    wrapper.find('button[name="next2"]').simulate('click');
  });
});
