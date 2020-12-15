import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { can } from 'modules/shared/libs/Roles';
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

describe('<Table Tramites', () => {
  let wrapper;

  const defaultProps = {
    setTable: jest.fn(),
    table: financialAdvices,
    isEmpty: false,
    handleShowModal: jest.fn(),
    loading: false,
  };

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/tramites']}>
        <Table {...defaultProps} />;
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

  test('Validando visualización de modal', () => {
    const viewExoneration = 'queryBack.table.viewExoneration';
    jest.mock('modules/shared/libs/Roles', () => ({
      can: jest.fn(),
    }));

    sessionStorage.setItem('roles', JSON.stringify({ roles: ['ROLE_BACK_OFFICE_ANALYST'] }));
    expect(can(viewExoneration, true)).toBe(true);
  });

  test('Validando visualización de detalle', () => {
    const viewValidationDocument = 'queryBack.table.validateDocument.viewValidateDocument';
    jest.mock('modules/shared/libs/Roles', () => ({
      can: jest.fn(),
    }));

    sessionStorage.setItem('roles', JSON.stringify({ roles: ['ROLE_BACK_OFFICE_ANALYST'] }));
    expect(can(viewValidationDocument, true)).toBe(true);
  });

  test('Existe seleccionar todos los trámites', () => {
    expect(wrapper.find('input[name="checked-all"]').exists()).toBe(true);
  });

  test('Seleccionar todos los trámites', () => {
    wrapper.find('input[name="checked-all"]').first().simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(wrapper.find('input[name="checked-all"]').first().prop('checked')).toEqual(true);
  });

  test('Existe seleccionar trámite', () => {
    expect(wrapper.find('input[name="seleccionar-tramite"]').exists()).toBe(true);
  });

  test('Existe checked seleccionar trámite', () => {
    wrapper.find('input[name="seleccionar-tramite"]').first().simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(wrapper.find('input[name="seleccionar-tramite"]').first().prop('checked')).toEqual(true);
  });
});
