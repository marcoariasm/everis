import React, { useState } from 'react';
import styled from 'styled-components';
import $ from 'global/styles';

import Button from 'global/components/v1/Button/Button';

import ImageFiltro from 'shared/images/iconos/filtro-orange.svg';
import CircleArrowUp from 'shared/images/iconos/arrowUpOrange.svg';
import CircleArrowDown from 'shared/images/iconos/arrowDownOrange.svg';

const Filter = (
  {
    children,
    onClickFilter,
    onClickClean,
    loading,
    hideFooter = false,
    heightOnShow = '315'
  }
) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleClickFilter = () => {
    setShowFilters(false);
    onClickFilter();
  };

  return (
    <Card show={String(showFilters)} height={String(heightOnShow)}>
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
      {!hideFooter && (
        <Buttons show={String(showFilters)}>
          <p
            onClick={loading ? () => {} : onClickClean}
            name="clean-filter"
          >
            Limpiar filtros
          </p>
          <Button
            className="inner"
            name="show-results"
            onClick={handleClickFilter}
            disabled={loading}
          >
            Aplicar
          </Button>
        </Buttons>
      )}
    </Card>
  );
};

export default Filter;

const Card = styled.div`
  position: relative;
  background: ${$.blanco};
  opacity: 0.9;
  border-radius: 6px;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border: solid 1px #e8e8e8;
  height: ${({ show, height }) => show === 'true' ? height + 'px' : '85px'};
  width: 100%;
  min-width: 880px;
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
    color: ${$.mainColor2};
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
