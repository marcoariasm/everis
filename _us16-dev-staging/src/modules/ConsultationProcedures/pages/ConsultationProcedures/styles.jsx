import styled from 'styled-components';
import { size } from '../../../../shared/styles/Responsive';

export const Title = styled.h1`
  margin-top: 15px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 23px;
    text-align: center;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 20px;
  }
`;
