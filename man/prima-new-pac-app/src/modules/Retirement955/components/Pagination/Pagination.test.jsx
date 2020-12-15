import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './Pagination';

const financialAvice = {
  totalItems: 31,
  financialAdvices: [
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
  ],
  currentPage: 0,
  totalPages: 4,
};

describe('<Pagination />', () => {
  let wrapper;

  const defaultProps = {
    data: financialAvice,
    setPage: jest.fn(),
    loading: false,
  };

  beforeEach(() => {
    wrapper = shallow(<Pagination {...defaultProps} />);
  });

  test('Existe el componente ', () => {
    expect(wrapper.find('#pagination')).toHaveLength(1);
  });

  test('Button previous enabled', () => {
    wrapper.find('.button-paginacion-1').simulate('click');
    expect(wrapper.find('.button-paginacion-1').prop('disabled')).toEqual(false);
  });

  test('Button next enabled', () => {
    wrapper.find('.button-paginacion-2').simulate('click');
    expect(wrapper.find('.button-paginacion-2').prop('disabled')).toEqual(false);
  });

  test('Button previous disabled', () => {
    wrapper.setProps({
      loading: true,
    });
    wrapper.find('.button-paginacion-1').simulate('click');
    expect(wrapper.find('.button-paginacion-1').prop('disabled')).toEqual(true);
  });

  test('Button next disabled', () => {
    wrapper.setProps({
      loading: true,
    });
    wrapper.find('.button-paginacion-2').simulate('click');
    expect(wrapper.find('.button-paginacion-2').prop('disabled')).toEqual(true);
  });

  test('Button next pagination enabled', () => {
    wrapper.setProps({
      loading: false,
    });
    wrapper.find('.button-paginacion-2').simulate('click');
    wrapper.setProps({
      loading: true,
    });
    expect(wrapper.find('.button-paginacion-1').prop('disabled')).toEqual(true);
    expect(wrapper.find('.button-paginacion-2').prop('disabled')).toEqual(true);
  });
});
