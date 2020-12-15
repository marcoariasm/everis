import React from 'react';
import { mount } from 'enzyme';
import StepOne from './stepOne';

describe('Test Step One', () => {
  let wrapper;
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Check validar identidad del cliente', () => {
    const validacionRENIEC = true;
    const setcheckValidation = jest.fn();

    wrapper = mount(
      <StepOne
        validacionRENIEC={validacionRENIEC}
        setcheckValidation={setcheckValidation}
      />,
    );

    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(setcheckValidation).toHaveBeenCalled();
  });
});
