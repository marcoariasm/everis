import React from 'react';
import { mount } from 'enzyme';
import Faker from 'faker';
import moment from 'moment';

import { act } from 'react-dom/test-utils';
import ValidacionSunat from './ValidacionSunat';

describe('Test Agenda Detalle - SUNAT', () => {
  let wrapper;

  test('Test Agenda Detalle - SUNAT Aceptado', async () => {
    const sunat = {
      status: 'Comprobado',
      fecVal: moment(Faker.date.recent()).format('dd/MM/yyyy'),
    };

    fetch.mockResponseOnce(JSON.stringify({}));

    wrapper = mount(<ValidacionSunat
      sunat={sunat}
    />);

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('div[className="validacion-sunat"]').exists()).toBe(true);
  });
});
