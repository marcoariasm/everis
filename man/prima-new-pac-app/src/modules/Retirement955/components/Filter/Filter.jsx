import React, { useState } from 'react';
import styled from 'styled-components';
import $ from 'global/styles';

import Button from 'global/components/v1/Button/Button';

import ImageFiltro from 'shared/images/iconos/filtro.svg';
import CircleArrowUp from 'shared/images/iconos/circleArrowUp.svg';
import CircleArrowDown from 'shared/images/iconos/circleArrowDown.svg';

const Filter = ({ children, onClickFilter, onClickClean, loading, disabled }) => {
  const [showFilters, setShowFilters] = useState(true)
  return (
    <Card show={String(showFilters)}>
      <SubTitle>
        <img className="imgFilter" src={ImageFiltro} alt="ImageFiltro" />
        <div>Filtrar por:</div>
        <CircleArrow
          src={showFilters ? CircleArrowUp : CircleArrowDown}
          alt="CircleArrowUp"
          onClick={() => setShowFilters((prev) => !prev)}
        />
      </SubTitle>
      <Filters show={String(showFilters)}>
        {children}
      </Filters>
      <Buttons show={String(showFilters)}>
        <p
          onClick={(disabled || loading) ? () => {} : onClickClean}
          name="clean-filter"
        >
          Limpiar filtros
        </p>
        <Button
          className="inner"
          name="show-results"
          onClick={onClickFilter}
          disabled={disabled || loading}
        >
          Mostrar resultados
        </Button>
      </Buttons>
    </Card>
  );
};

export default Filter;

const Card = styled.div`
  position: relative;
  background: ${$.blanco};
  opacity: 0.9;
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: ${({ show }) => show === 'true' ? '345px' : '85px'};
  width: 100%;
  min-width: 1002px;
  min-height: 85px;
  margin-top: 22px;
  padding: 33px 24px 34px 26px;
  & > h1 {
    font-family: FS Emeric;
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 21px;
    letter-spacing: 0.03em;
    color: ${$.verde};
  }
`;

const SubTitle = styled.div`
  display: flex;
  position: relative;
  height: 30px;
  margin-bottom: 22px;
  & > .imgFilter {
    height: 21px;
    width: 21px;
    margin-right: 8px;
  }
  & > div {
    font-family: FS Emeric;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.03em;
    color: ${$.verde};
    padding-top: 2px;
  }
`;

const CircleArrow = styled.img`
  position: absolute;
  right: 2px;
  cursor: pointer;
`;

const Filters = styled.div`
  display: ${({ show }) => (show === 'true' ? 'flex' : 'none')};
  min-height: 70px;
`;

const Buttons = styled.div`
  position: absolute;
  display: ${({ show }) => (show === 'true' ? 'flex' : 'none')};
  justify-content: flex-end;
  right: 25px;
  bottom: 34px;
  cursor: pointer;
  & > p {
    font-family: FS Emeric;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 44px;
    letter-spacing: 0.03em;
    color: rgba(105, 97, 88, 0.6);
    padding-right: 21px;
    text-decoration-line: underline;
  }
`;
