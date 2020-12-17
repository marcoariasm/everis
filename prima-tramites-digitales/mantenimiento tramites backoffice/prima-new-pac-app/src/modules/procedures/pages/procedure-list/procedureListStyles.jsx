import styled from 'styled-components';

export const Column = styled.div`
  width: ${({ width }) => `${width}%`};
  margin-right: ${({ mRight }) => `${mRight || 0}px`};
`;

export const Title = styled.h1`
  margin-top: 15px;
  font-size: 26px;
  color: #ff4f00;
  font-weight: bold;
`;
