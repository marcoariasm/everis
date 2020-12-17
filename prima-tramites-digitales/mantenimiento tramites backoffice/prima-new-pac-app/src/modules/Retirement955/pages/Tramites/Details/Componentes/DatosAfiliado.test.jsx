import React from 'react';
import Faker from 'faker';

import { mount } from 'enzyme';

import moment from 'moment';
import DatosAfiliado from './DatosAfiliado';

describe('Test Tramites Detalle - Datos Afiliado ', () => {
  let wrapper;

  test('Test de Loading', () => {
    wrapper = mount(<DatosAfiliado
      afiliado={null}
      isLoading
      isError={false}
      acceso={null}
      cuspp="TESTINGCUSPP"
    />);
    expect(wrapper.find('img[alt="Loading"]').exists()).toBe(true);
  });

  test('Test de Error', () => {
    wrapper = mount(<DatosAfiliado
      afiliado={null}
      isLoading={false}
      isError
      acceso={null}
      cuspp="TESTINGCUSPP"
    />);
    expect(wrapper.find('div[className="has-error"]').exists()).toBe(true);
  });

  describe('Test con Afiliado REJA', () => {
    const afiliado = {
      surname: Faker.name.lastName(),
      motherSurname: Faker.name.lastName(),
      firstName: Faker.name.firstName(),
      secondName: Faker.name.firstName(),
      birthDate: moment(Faker.date.past(60)).format('DD/MM/yyyy'),
      documentTypeName: Faker.random.arrayElement(['DNI', 'CE']),
      documentNumber: Faker.random.number({ min: 11111111, max: 99999999 }).toString(),
    };

    const access = Faker.random.arrayElement(['Reja', 'Legal']);

    const cuspp = Faker.random.alphaNumeric(12);

    beforeEach(() => {
      wrapper = mount(<DatosAfiliado
        afiliado={afiliado}
        isLoading={false}
        isError={false}
        acceso={access}
        cuspp={cuspp}
      />);
    });

    test('Test Afiliado: Name', () => {
      expect(wrapper.find('div[className="card-item name-lastname"]')
        .find('div[className="value"]')
        .text())
        .toEqual(
          `${afiliado.surname} ${afiliado.motherSurname} ${afiliado.firstName} ${afiliado.secondName}`,
        );
    });

    test('Test Afiliado: CUSPP', () => {
      expect(wrapper.find('div[className="card-item cuspp"]')
        .find('div[className="value"]')
        .text())
        .toEqual(cuspp);
    });

    test('Test Afiliado: birthdate', () => {
      expect(wrapper.find('div[className="card-item birthdate"]')
        .find('div[className="value"]')
        .text())
        .toEqual(afiliado.birthDate);
    });

    test('Test Afiliado: Document Type', () => {
      expect(wrapper.find('div[className="card-item document-type"]')
        .find('div[className="value"]')
        .text())
        .toEqual(afiliado.documentTypeName);
    });

    test('Test Afiliado: Document Number', () => {
      expect(wrapper.find('div[className="card-item document-number"]')
        .find('div[className="value"]')
        .text())
        .toEqual(afiliado.documentNumber.toString());
    });

    test('Test Afiliado: Access', () => {
      expect(wrapper.find('div[className="card-item access"]')
        .find('div[className="value"]')
        .text())
        .toEqual(access.toUpperCase());
    });
  });
});
