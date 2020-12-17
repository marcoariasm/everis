import React, { useState } from 'react';
import styled from 'styled-components';
import './styles.scss';

export const ButtonPrev = styled.button`
  display: ${(props) => (props.isHidden ? 'none' : '')};
`;

export const ButtonNext = styled.button`
  display: ${(props) => (props.isHidden ? 'none' : '')};
`;

const Pagination = ({ data, setPageNumber, loading }) => {
  const procedures = data || {};

  const [pager, setPager] = useState({
    currentPage: 1,
    startIndex: 0,
    endIndex: procedures.size ? procedures.size - 1 : 9,
  });

  const getPager = (totalElements, pageNumber, pageSize) => {
    pageSize = procedures.size;
    const { totalPages } = procedures;

    let startPage; let
      endPage;
    if (pageNumber <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (pageNumber + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = pageNumber - 5;
      endPage = pageNumber + 4;
    }

    // calculate start and end item indexes
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalElements - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i,
    );

    // return object with all pager properties required by the view
    return {
      totalElements,
      currentPage: pageNumber,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  };

  const setPage = (page) => {
    const pager = getPager(procedures.totalElements, page);

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // update state
    setPager(pager);
    setPageNumber(page);
  };

  return (
    <ul className="pagination">
      <ButtonPrev
        className="button-prev"
        isHidden={pager.currentPage === 1}
        onClick={() => setPage(pager.currentPage - 1)}
      >
        Anterior
      </ButtonPrev>
      <span className="titleFooter">{pager.startIndex + 1}</span>
      <span className=" titleFooter mr-1">-</span>
      <span className="titleFooter ml-1">
        {pager.endIndex + 1}
        {' '}
        de
        {procedures.totalElements}
      </span>
      <ButtonNext
        className="button-next"
        onClick={() => setPage(pager.currentPage + 1)}
        isHidden={pager.currentPage === pager.totalPages}
      >
        Siguiente
      </ButtonNext>
    </ul>
  );
};

export default Pagination;
