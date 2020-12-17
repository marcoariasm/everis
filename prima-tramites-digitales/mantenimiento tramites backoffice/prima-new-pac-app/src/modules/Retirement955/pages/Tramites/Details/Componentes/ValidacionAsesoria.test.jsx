import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ValidacionAsesoria from './ValidacionAsesoria';

describe('Test Tramites Detalle - Upload File Icon ', () => {
  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  const advisor = {
    advisorId: 1,
    names: 'Lucia',
    fatherLastName: 'Negron',
    motherLastName: 'De Vivero',
    email: 'string',
    startAmount: 0,
    annex: 'string',
    area: 'string',
    endAmount: 0,
    procedure: 'string',
  };

  test('Test de Loading', async () => {
    fetch.once(JSON.stringify(advisor));

    wrapper = mount(<ValidacionAsesoria
      number={1}
      status="Aceptado"
      advisorID={1}
    />);

    await act(async () => wrapper);
    wrapper.update();

    expect(wrapper.find('div[className="validacion-advisorData"]').exists()).toBe(true);
  });
});
