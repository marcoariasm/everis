import React from 'react';
import { mount } from 'enzyme';
import Faker from 'faker';
import moment from 'moment';
import BoxHistory from './BoxHistory';

describe('Test Tramites Detalle - Box History ', () => {
  let wrapper;

  test('Test de Loading', () => {
    wrapper = mount(<BoxHistory
      history={[]}
    />);

    expect(wrapper.find('div[className="table historial"]').exists()).toBe(true);
  });

  test('Test de Datos', () => {
    const history = [{
      status: 'Confirmado',
      reason: Faker.lorem.words(),
      date: moment(Faker.date.recent()).format('DD/MM/yyyy'),
      user: `${Faker.name.lastName()} ${Faker.name.firstName()}`,
    }, {
      status: 'Aceptado',
      reason: Faker.lorem.words(),
      date: moment(Faker.date.recent()).format('DD/MM/yyyy'),
      user: `${Faker.name.lastName()} ${Faker.name.firstName()}`,
    }, {
      status: 'Pendiente',
      reason: Faker.lorem.words(),
      date: moment(Faker.date.recent()).format('DD/MM/yyyy'),
      user: `${Faker.name.lastName()} ${Faker.name.firstName()}`,
    }, {
      status: 'Rechazado',
      reason: Faker.lorem.words(),
      date: moment(Faker.date.recent()).format('DD/MM/yyyy'),
      user: `${Faker.name.lastName()} ${Faker.name.firstName()}`,
    }, {
      status: 'Observado',
      reason: Faker.lorem.words(),
      date: moment(Faker.date.recent()).format('DD/MM/yyyy'),
      user: `${Faker.name.lastName()} ${Faker.name.firstName()}`,
    }];

    wrapper = mount(<BoxHistory
      history={history}
    />);

    expect(wrapper.find('div[className="table historial"]').exists()).toBe(true);
  });
});
