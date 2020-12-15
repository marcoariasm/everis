import React from 'react';
import { mount } from 'enzyme';
import Faker from 'faker';
import DatosTramite from './DatosTramite';

describe('Test Agenda Detalle - Datos Tramite ', () => {
  let wrapper;

  test('Test de REJA Accepted', () => {
    const FAD = {
      accumulatedFund: 0,
      regimeName: 'reja',
      channelCode: 'Web',
      states: [
        {
          state: 'ACCEPTED',
          stateName: 'Aceptado',
          date: Faker.date.recent(),
        },
      ],
    };

    wrapper = mount(<DatosTramite
      isLegal={false}
      FAD={FAD}
      FADLoading
    />);

    expect(wrapper.find('div[className="datos-tramite"]').exists()).toBe(true);
  });

  test('Test de REJA Observed', () => {
    const FAD = {
      accumulatedFund: 0,
      regimeName: 'reja',
      channelCode: 'Web',
      states: [
        {
          state: 'OBSERVED',
          stateName: 'Observado',
          date: Faker.date.recent(),
        },
      ],
    };

    wrapper = mount(<DatosTramite
      isLegal={false}
      FAD={FAD}
      FADLoading
    />);

    expect(wrapper.find('div[className="datos-tramite"]').exists()).toBe(true);
  });
  test('Test de Legal Accepted', () => {
    const FAD = {
      accumulatedFund: 0,
      regimeName: 'legal',
      channelCode: 'Web',
      states: [
        {
          state: 'ACCEPTED',
          stateName: 'Aceptado',
          date: Faker.date.recent(),
        },
      ],
    };

    wrapper = mount(<DatosTramite
      isLegal
      FAD={FAD}
      FADLoading
    />);

    expect(wrapper.find('div[className="datos-tramite"]').exists()).toBe(true);
  });

  test('Test de LEGAL Observed', () => {
    const FAD = {
      accumulatedFund: 0,
      regimeName: 'legal',
      channelCode: 'Web',
      states: [
        {
          state: 'OBSERVED',
          stateName: 'Observado',
          date: Faker.date.recent(),
        },
      ],
    };

    wrapper = mount(<DatosTramite
      isLegal
      FAD={FAD}
      FADLoading
    />);

    expect(wrapper.find('div[className="datos-tramite"]').exists()).toBe(true);
  });
});
