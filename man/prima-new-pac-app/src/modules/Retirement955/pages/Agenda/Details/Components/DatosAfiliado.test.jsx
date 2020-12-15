import React from 'react';
import { mount } from 'enzyme';
import Faker from 'faker';
import moment from 'moment';
import { act } from 'react-dom/test-utils';
import DatosAfiliado from './DatosAfiliado';

describe('Test Agenda Detalle - Datos Afiliado ', () => {
  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Test de Loading', () => {
    const FAD = {
      accumulatedFund: 0,
      regimeName: 'reja',
    };

    wrapper = mount(<DatosAfiliado
      cuspp={null}
      FAD={FAD}
      FADLoading
    />);

    expect(wrapper.find('div[className="datos-afiliado"]').exists()).toBe(true);
  });

  test('Test Full', async () => {
    const afiliado = {
      surname: Faker.name.lastName(),
      motherSurname: Faker.name.lastName(),
      firstName: Faker.name.firstName(),
      secondName: Faker.name.firstName(),
      birthDate: moment(Faker.date.past(60)).format('DD/MM/yyyy'),
      documentTypeName: Faker.random.arrayElement(['DNI', 'CE']),
      documentNumber: Faker.random.number({ min: 11111111, max: 99999999 }).toString(),
      age: 60,
      maritalStatusName: 'Casado',
    };

    const afiliadoContacto = {
      phones: [
        {
          type: 'MOBILE_PHONE',
          number: Faker.phone.phoneNumberFormat(),
        },
        {
          type: 'DIRECT_LINE',
          number: Faker.phone.phoneNumberFormat(),
        },
      ],
      email: Faker.internet.email(),
    };

    const FAD = {
      accumulatedFund: 0,
      regimeName: 'reja',
    };

    fetch.mockResponseOnce(JSON.stringify(afiliado));
    fetch.mockResponseOnce(JSON.stringify(afiliadoContacto));

    wrapper = mount(<DatosAfiliado
      cuspp="1234567890123"
      FAD={FAD}
      FADLoading
    />);

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('div[className="datos-afiliado"]').exists()).toBe(true);
  });

  test('Test Full Sin Email', async () => {
    const afiliado = {
      surname: Faker.name.lastName(),
      motherSurname: Faker.name.lastName(),
      firstName: Faker.name.firstName(),
      secondName: Faker.name.firstName(),
      birthDate: moment(Faker.date.past(60)).format('DD/MM/yyyy'),
      documentTypeName: Faker.random.arrayElement(['DNI', 'CE']),
      documentNumber: Faker.random.number({ min: 11111111, max: 99999999 }).toString(),
      age: 60,
      maritalStatusName: 'Casado',
    };

    const afiliadoContacto = {
      phones: [
        {
          type: 'MOBILE_PHONE',
          number: Faker.phone.phoneNumberFormat(),
        },
        {
          type: 'DIRECT_LINE',
          number: Faker.phone.phoneNumberFormat(),
        },
      ],
      email: '',
    };

    const FAD = {
      accumulatedFund: Faker.random.number({ min: 50000, max: 1000000 }),
      regimeName: 'reja',
    };

    fetch.mockResponseOnce(JSON.stringify(afiliado));
    fetch.mockResponseOnce(JSON.stringify(afiliadoContacto));

    wrapper = mount(<DatosAfiliado
      cuspp="1234567890123"
      FAD={FAD}
      FADLoading
    />);

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('div[className="datos-afiliado"]').exists()).toBe(true);
  });
});
