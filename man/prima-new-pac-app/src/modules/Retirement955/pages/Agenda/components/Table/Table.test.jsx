import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Table from './Table';

const financialAdvices = [
  {
    advisorAttentionDate: null,
    advisorId: 2,
    affiliate: 'Solano Ramirez Luis Gerardo',
    affiliateId: '954397VQXJ4',
    financialAdviceCode: '1',
    financialAdviceId: 1,
    procedure: 'Jubilación y/o retiro de hasta el 95.5%',
    registrationDate: '2020-09-15',
    sourceChanel: null,
    status: 'REJECTED',
    statusId: 3,
  },
  {
    advisorAttentionDate: null,
    advisorId: 2,
    affiliate: 'Solano Ramirez Luis Gerardo',
    affiliateId: '954397VQXJ4',
    financialAdviceCode: '1',
    financialAdviceId: 1,
    procedure: 'Jubilación y/o retiro de hasta el 95.5%',
    registrationDate: '2020-09-15',
    sourceChanel: null,
    status: 'REJECTED',
    statusId: 3,
  },
];

describe('<Table Agenda-Front', () => {
  let wrapper;

  const defaultProps = {
    loading: false,
    isEmpty: false,
    frames: '1fr 1fr 1.2fr 2fr 0.8fr 1fr 1fr',
    data: financialAdvices,
  };

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/agenda']}>
        <Table {...defaultProps} />
      </MemoryRouter>,
    );
  });

  test('Existe el componente', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('Validando que exista la clase t-row', () => {
    expect(wrapper.find('.t-row').exists()).toBe(true);
  });

  test('Validando que exista la clase key', () => {
    expect(wrapper.find('.key').exists()).toBe(true);
  });

  test('Validando visualización de detalle', () => {
    wrapper.find('.key').first().simulate('click');
  });
});
