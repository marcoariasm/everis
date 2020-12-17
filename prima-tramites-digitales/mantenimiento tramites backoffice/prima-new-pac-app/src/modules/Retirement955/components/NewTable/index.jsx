import React from 'react';
import styled from 'styled-components';

import $ from 'global/styles';

import './style.sass';

const Table = ({ headers, children, isEmpty, frames, loading = false }) => {
  const listHeaders = () => {
    if (!headers) return <></>;
    return headers.map((header, i) => (
      <ItemHead key={i} className="">{header}</ItemHead>
    ));
  };

  return (
    <Wrapper id="table">
      <THeader frames={frames} className="table-header">
        {listHeaders()}
      </THeader>
      <TBody frames={frames} className="main-table-body">
        {loading
          ? <Empty><p>Cargando registros ...</p></Empty>
          : children}
        {isEmpty && (
          <Empty>
            <p>No se han encontrado registros</p>
          </Empty>
        )}
      </TBody>
    </Wrapper>
  );
};

export default Table;

const Wrapper = styled.div`
  min-width: 1009px;
  width: 100%;
`;

const THeader = styled.div`
  display: grid;
  grid-template-columns: ${({ frames }) => frames};
  grid-template-rows: 72px;
  height: 74px;
  border-radius: 10px;
  padding-left: 45px;
  padding-right: 39px;
  border-radius: 10px;
  margin-bottom: 10px;
  background: ${$.verde};
`;

const TBody = styled.div`
  & > .t-row {
    display: grid;
    grid-template-columns: ${({ frames }) => frames};
    grid-template-rows: 72px;
    cursor: default;
    & > div {
      display: flex;
      align-items: center;
    }
  }
`;

const ItemHead = styled.div`
  display: flex;
  align-items: center;
  display: inherit;
  color: ${$.blanco};
  font-family: FS Emeric;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.02em;
  text-align: center;
  height: 74px;
  background: ${$.verde};
`;

const Empty = styled.div`
  background: ${$.blanco};
  box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  height: 144px;
  width: 100%;
  & > p {
    margin: 0 auto;
    font-family: Calibri;
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    line-height: 144px;
    width: 250px;
    letter-spacing: 0.01em;
    color: ${$.gris};
  }
`;
