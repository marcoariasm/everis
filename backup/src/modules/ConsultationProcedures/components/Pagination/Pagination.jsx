import React, { useState } from "react";
import States from "../States/States";
import "./styles.scss";
import {
  ContainerCardsProcedure,
  ContainerNumbersPagination,
  HeaderPagination,
  PaginationButton,
  PaginationContainer,
} from "./styles";

function Pagination({ items, onChangePage, children, isFinished = false }) {
  const getPager = (totalItems, currentPage, pageSize) => {
    pageSize = pageSize || 5;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
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
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  };

  const [pager, setPager] = useState(getPager(items.length, 1));

  const setPage = (page) => {
    let pager = getPager(items.length, page);

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    setPager(pager);

    // call change page function in parent component
    onChangePage(pageOfItems);
  };

  const paginationComponent = () => {
    return (
      <PaginationContainer
        className="pagination"
        alignEnd={pager.totalPages === 1}
      >
        <PaginationButton
          isHidden={pager.currentPage === 1}
          onClick={() => setPage(pager.currentPage - 1)}
        >
          Regresar
        </PaginationButton>
        <ContainerNumbersPagination>
          <span>{pager.startIndex + 1}</span>
          <span className="mr-1">-</span>
          <span className="ml-1">{pager.endIndex + 1}</span>
          <span className="ml-1">de</span>
          <span className="ml-1">`{items.length}</span>
        </ContainerNumbersPagination>
        <PaginationButton
          onClick={() => setPage(pager.currentPage + 1)}
          isHidden={pager.currentPage === pager.totalPages}
          displayNone={pager.totalPages === 1}
        >
          Siguiente
        </PaginationButton>
      </PaginationContainer>
    );
  };

  return (
    <>
      <HeaderPagination>
        <States isFinished={isFinished} />
        {paginationComponent()}
      </HeaderPagination>
      <ContainerCardsProcedure>{children}</ContainerCardsProcedure>
      {paginationComponent()}
    </>
  );
}

export default Pagination;
