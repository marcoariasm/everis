import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import currency from 'currency.js';
import InfoAfiliado from './index';

describe('Test de InfoAfiliado - ', () => {
  let wrapper;

  const mockData = {
    ADVISERID: 1,
    AGENCY: '',
    CHANEL: 'Web',
    CUSPP: '306987ENMCV1',
    DOC: '75064971',
    FEC_SOL: '2020-10-12',
    FEC_VAL: '2020-09-04',
    ID: '95.5-E1-0000045463',
    IDAGENCY: '0',
    IDCHANEL: 'WEB',
    IDDOC: '00',
    IDPROCEDURE: '015',
    IDPROCEDURESTATUS: '1',
    NAME: 'MARIO ROGELIO CARRILLO MORA',
    PROCEDURE: 'Jubilación y/o retiro de hasta el 95.5%',
    STATUS: 'Registrado',
    TYPE_DOC: 'D.N.I',
    affiliateId: '1231321',
  };

  const afiliado = {
    age: 65,
    birthDate: '14/02/1955',
    deceased: false,
    disability: false,
    documentNumber: '51158680',
    documentType: 'DNI',
    documentTypeName: 'DNI',
    firstName: 'BAUDILIO',
    gender: 'MALE',
    genderName: 'Masculino',
    maritalStatus: 'MARRIED',
    maritalStatusName: 'Casado(a)',
    motherSurname: 'JIMENEZ',
    nativeCountry: 'PERUANO',
    surname: 'YVÑZERWVH',
  };

  const cic = {
    id: '99002691027',
    cicType: 'INDIVIDUAL',
    cicTypeName: 'Individual',
    status: 'ACTIVE',
    statusReasonCode: 'A01',
    statusName: 'Activo',
    statusReasonDescription: 'AFILIACION NORMAL',
    pensionableTotalBalance: 0.00,
    consultationDate: '09/10/2020',
    commissionType: 'F',
    maximumAccrualPeriod: '201711',
    balances: [
      {
        type: 'MANDATORY_PENSIONABLE_PURPOSE',
        typeName: 'Obligatorio con fin previsional',
        fundType: 'FUND_0',
        fundTypeName: 'Fondo 0',
        totalFees: 0,
        nominalValue: 0.00,
        feeValue: 0.30,
        feeValueDate: '01/03/2019',
      },
      {
        type: 'VOLUNTARY_PENSIONABLE_PURPOSE',
        typeName: 'Voluntario con fin previsional',
        fundType: 'FUND_0',
        fundTypeName: 'Fondo 0',
        totalFees: 0,
        nominalValue: 0.00,
        feeValue: 0.30,
        feeValueDate: '01/03/2019',
      },
      {
        type: 'VOLUNTARY_NON_PENSIONABLE_PURPOSE',
        typeName: 'Voluntario sin fin previsional',
        fundType: 'FUND_2',
        fundTypeName: 'Fondo 2',
        totalFees: 0,
        nominalValue: 0.00,
        feeValue: 34.20,
        feeValueDate: '01/03/2019',
      },
    ],
  };

  const pensionBonus = {
    bondId: 95505,
    confirmed: 'CONFIRMADO',
    nominalValue: 60000,
    number: '156022',
    receptionDate: '1997-09-12',
    state: '18',
    stateDescription: 'TITULO EMITIDO',
    type: 'BONO 1992',
    typeDescription: 'TITULO DE BONO',
    updatedValue: 227274,
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Test de sección de Información de afiliado - Nombres y Apellidos', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.informacion-afiliado .nombresApellidos').exists()).toBe(true);

    const nameComplete = `${afiliado.surname || ''} ${afiliado.motherSurname || ''},
    ${afiliado.firstName || ''} ${afiliado.secondName || ''}`;

    expect(wrapper.find('.informacion-afiliado .nombresApellidos')
      .text())
      .toEqual(nameComplete);
  });

  test('Test de sección de Información de afiliado - Cuspp', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.informacion-afiliado .cuspp').exists()).toBe(true);

    expect(wrapper.find('.informacion-afiliado .cuspp')
      .text())
      .toEqual(mockData.affiliateId);
  });

  test('Test de sección de Información de afiliado - Estado', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.informacion-afiliado .estado').exists()).toBe(true);

    expect(wrapper.find('.informacion-afiliado .estado')
      .text())
      .toEqual(cic.statusName);
  });

  test('Test de sección de Información de afiliado - Tipo documento', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.informacion-afiliado .tipoDoc').exists()).toBe(true);

    expect(wrapper.find('.informacion-afiliado .tipoDoc')
      .text())
      .toEqual(afiliado.documentType);
  });

  test('Test de sección de Información de afiliado - Número documento', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.informacion-afiliado .numDoc').exists()).toBe(true);

    expect(wrapper.find('.informacion-afiliado .numDoc')
      .text())
      .toEqual(afiliado.documentNumber);
  });

  test('Test de sección de Información de afiliado - Edad', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.informacion-afiliado .edad').exists()).toBe(true);

    expect(wrapper.find('.informacion-afiliado .edad')
      .text())
      .toEqual(`${afiliado.age} años`);
  });

  test('Test de seccion Fondos Voluntarios - F1', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.fondos-voluntarios .f1').exists()).toBe(true);
    expect(wrapper.find('.fondos-voluntarios .f1')
      .text())
      .toEqual(currency(cic.balances[1].nominalValue, { symbol: '' }).format());
  });

  test('Test de seccion Fondos Voluntarios - F2', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.fondos-voluntarios .f2').exists()).toBe(true);
    expect(wrapper.find('.fondos-voluntarios .f2')
      .text())
      .toEqual(currency(cic.balances[2].nominalValue, { symbol: '' }).format());
  });

  test('Test de seccion Bono de reconocimiento - Estado', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.bono-reconocimiento .estado').exists()).toBe(true);
    expect(wrapper.find('.bono-reconocimiento .estado')
      .text())
      .toEqual(pensionBonus.stateDescription);
  });

  test('Test de seccion Bono de reconocimiento - Valor nominal', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.bono-reconocimiento .valorNominal').exists()).toBe(true);
    expect(wrapper.find('.bono-reconocimiento .valorNominal')
      .text())
      .toEqual(`S/${currency(pensionBonus.nominalValue, { symbol: '' }).format()}`);
  });

  test('Test de seccion Bono de reconocimiento - Valor actualizado', async () => {
    fetch.mockResponseOnce(JSON.stringify(pensionBonus));
    fetch.mockResponseOnce(JSON.stringify(cic));
    fetch.mockResponseOnce(JSON.stringify(afiliado));

    wrapper = mount(
      <InfoAfiliado
        FAD={mockData}
      />,
    );

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('.bono-reconocimiento .valorActualizado').exists()).toBe(true);
    expect(wrapper.find('.bono-reconocimiento .valorActualizado')
      .text())
      .toEqual(`S/${currency(pensionBonus.updatedValue, { symbol: '' }).format()}`);
  });
});
