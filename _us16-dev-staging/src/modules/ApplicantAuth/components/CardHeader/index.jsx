import React from 'react';
import styled from 'styled-components';
import { size } from '../../../../shared/styles/Responsive';

export const LogInAnteTitle = styled.p`
  color: #696158;
  font-size: 14px;
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 12px;
    margin-top: 0.7em;
  }
`;

export const MainAnteTitle = styled.p`
  color: #ff4f00;
  font-size: 20px;
  font-weight: bold;
  @media only screen and (max-width: ${size.tabletS}) {
    font-size: 17px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 15px;
    margin-top: 1em;
  }
`;

export const LoginTitle = styled.h1`
  margin-top: 15px;
  @media only screen and (max-width: ${size.tabletS}) {
    font-size: 23px;
    margin-top: 0.5em;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 20px;
  }
`;

const CardHeader = ({ anteTitle, title, subtitle, mainAnteTitle, description }) => {
  return (
    <div className="pb2em">
      { mainAnteTitle && <MainAnteTitle>{mainAnteTitle}</MainAnteTitle> }
      { anteTitle && <LogInAnteTitle>{anteTitle}</LogInAnteTitle>}
      <LoginTitle className="headerTitleHighligh">{title}</LoginTitle>
      { subtitle && <p className="tableBodyText textCenter pt4em">{ subtitle }</p>}
      { description && <p className="tableBodyText pt1em" >{ description }</p> }
    </div>
  )
}

export default CardHeader;



// Applicant Details
// export const LoginTitle = styled.h1`
//   margin-top: 15px;
//   display: block;
//   padding-left: 0.3em;
//   @media only screen and (max-width: ${size.mobileL}) {
//     font-size: 23px;
//     margin-top: 0px;
//   }
//   @media only screen and (max-width: ${size.mobileS}) {
//     font-size: 20px;
//   }
// `;