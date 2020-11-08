import React from "react";
import styled from "styled-components";

//images
import ErrorImage from "./images/error.svg";
import InfoImage from "./images/info.svg";
import WarningImage from "./images/warning.svg";

const AlertContainer = styled.div`
  font-family: 'Calibri';
  position: relative;
  padding: 0.75rem 1.3rem;
  margin: 1rem 0;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  font-size:   ${({fontSize}) => fontSize || '12px'};
  img {
    ${({hasImage}) => hasImage ? `
      padding-right: 1.3rem;
      height: 2rem;
    `: `display: none;`
    }
  }

  ${({ bgAlert }) => `background-color:${bgAlert};`}

`;

const Alert = ({ type = "info", message, hasImage = true, fontSize = '12px' }) => {
  
  const alertProps = (alertType) =>{
    let alertProps = {
      alertType, 
      bgAlert : ''
    };

    switch(type){
      case 'info':
        alertProps.alertType = InfoImage;
        alertProps.bgAlert = '#d1ecf1';
        break;
      case 'warning':
        alertProps.alertType = WarningImage;
        alertProps.bgAlert = '#fff3cd';
        break;
      case 'error':
        alertProps.alertType = ErrorImage;
        alertProps.bgAlert = '#f8d7da';
        break;
    }
    return {
      ...alertProps
    };
  }

  return (
    <AlertContainer bgAlert={alertProps(type).bgAlert} hasImage={hasImage} fontSize={fontSize}>
      <img src={alertProps(type).alertType} alt="Alert Image" />
      {message}
    </AlertContainer>
  );
};

export default Alert;
