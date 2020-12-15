import React from 'react';

import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Login from './index';

const mockStore = configureMockStore();
const store = mockStore();

describe('Test case for testing login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Provider store={store}><Login /></Provider>);
  });

  test('Login - Campo Matricula Existe', () => {
    expect(wrapper.find('input[type="text"]').length).toEqual(1);
  });

  test('Login - Campo Contraseña Existe', () => {
    expect(wrapper.find('input[type="password"]').length).toEqual(1);
  });

  test('Login - Campo Matricula debe cambiar de valor', () => {
    wrapper.find('input[type="text"]').simulate('input', {
      target: {
        value: 'juanperez',
        validity: {
          valid: true
        },
        type: 'text',
        name: 'matricula'
      },
    });
    expect(wrapper.find('input[type="text"]').prop('value')).toEqual(
      'juanperez',
    );
  });

  test('Login - Campo Contraseña debe cambiar de valor', () => {
    wrapper.find('input[type="password"]').simulate('change', {
      target: {
        value: '123456',
      },
    });
    expect(wrapper.find('input[type="password"]').prop('value')).toEqual(
      '123456',
    );
  });

  test('Login - Botón submit desabilitado', () => {
    wrapper.find('button').simulate('click');
    expect(
      wrapper.find('button').prop('disabled'),
    ).toBeTruthy();
  });

  test('Login - Botón submit habilitado', () => {
    wrapper.find('input[type="text"]').simulate('input', {
      target: {
        value: 'juanperez',
        validity: {
          valid: true
        },
        type: 'text',
        name: 'matricula'
      },
    });
    wrapper.find('input[type="password"]').simulate('change', {
      target: {
        value: '123456',
      },
    });
    expect(
      wrapper.find('button').prop('disabled'),
    ).toBeFalsy();
  });
});
