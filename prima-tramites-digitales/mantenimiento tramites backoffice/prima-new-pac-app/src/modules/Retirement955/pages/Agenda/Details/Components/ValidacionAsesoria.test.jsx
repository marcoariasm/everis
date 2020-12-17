import React from 'react';
import { mount } from 'enzyme';
import Faker from 'faker';
import { act } from 'react-dom/test-utils';
import ValidacionAsesoria from './ValidacionAsesoria';

describe('Test Agenda Detalle - Asesoria ', () => {
  let wrapper;

  test('Test de TableDocumentos - Vacio - isReja:true - hasLes100:true', async () => {
    const asesoria = {
      advisorId: 1,
      status: 'Aceptado',
    };

    const advisor = {
      names: Faker.name.firstName(),
      fatherLastName: Faker.name.lastName(),
      motherLastName: Faker.name.lastName(),
    };

    fetch.mockResponseOnce(JSON.stringify(advisor));

    wrapper = mount(<ValidacionAsesoria
      asesoria={asesoria}
      isREJA
      hasLess100
      limitDate={Faker.date.recent()}
    />);

    await act(async () => wrapper);
    wrapper.update();

    expect(
      wrapper
        .find('div[className="validacion-asesoria"]').exists(),
    )
      .toBe(true);
  });
  test('Test de TableDocumentos - Vacio - isReja:false - hasLes100:false', async () => {
    const asesoria = {
      advisorId: 1,
      status: 'Aceptado',
    };

    const advisor = {
      names: Faker.name.firstName(),
      fatherLastName: Faker.name.lastName(),
      motherLastName: Faker.name.lastName(),
    };

    fetch.mockResponseOnce(JSON.stringify(advisor));

    wrapper = mount(<ValidacionAsesoria
      asesoria={asesoria}
      isREJA={false}
      hasLess100={false}
      limitDate={Faker.date.recent()}
    />);

    await act(async () => wrapper);
    wrapper.update();

    expect(
      wrapper
        .find('div[className="validacion-asesoria"]').exists(),
    )
      .toBe(true);
  });
});
