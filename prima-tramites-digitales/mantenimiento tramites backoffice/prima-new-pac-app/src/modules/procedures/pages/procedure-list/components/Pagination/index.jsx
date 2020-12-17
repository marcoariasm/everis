import React, { useState } from 'react';
import styled from 'styled-components';
import './styles.scss';

export const ButtonPrev = styled.button`
  display: ${(props) => (props.isHidden ? 'none' : '')};
`;

export const ButtonNext = styled.button`
  display: ${(props) => (props.isHidden ? 'none' : '')};
`;

const Pagination = ({
  items, onChangePage, itemsInfo, setPagerInfo, setNumberPage
}) => {
  const [pager, setPager] = useState({
    currentPage: 1,
    startIndex: 0,
    endIndex: 9,
  });

  const getPager = (totalItems, currentPage, pageSize = 10) => {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i,
    );

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
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
    let pager = getPager(itemsInfo.totalElements, page);

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    if (items.length <= pager.startIndex) {
      setPagerInfo(pager);
      setNumberPage(itemsInfo.pageNumber + 1);
    }

    // update state
    setPager(pager);

    // call change page function in parent component
    onChangePage(pageOfItems);
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
        {' '}
        {itemsInfo.totalElements}
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
