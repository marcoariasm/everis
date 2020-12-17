import React from 'react';
import styled from 'styled-components';
import $ from 'global/styles';

const Header = ({ title, path = [] }) => {
  const pathList = path.map(
    (item, i) => (
      <PathItem key={i}>
        {item}
        {' '}
        {path.length !== i + 1
          ? ' / '
          : ''}
        {' '}

      </PathItem>
    ),
  );

  return (
    <Wrapper>
      <h2 className="green">{title}</h2>
      <Path className="">{pathList}</Path>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 705px;
  & > h2 {
    color: ${$.gris};
  }
`;

const Path = styled.div`
  margin: 5px 0px;
  font-family: FS Emeric;
  font-weight: normal;
`;

const PathItem = styled.span`
  font-size: 16px;
  color: ${$.gris};
  font-family: FS Emeric;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-feature-settings: 'pnum' on, 'lnum' on;
  &:last-child {
    color: ${$.mainColor2};
    letter-spacing: 0.02em;
  }
`;
