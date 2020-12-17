import React ,{ useState, useEffect } from "react";
import styled from "styled-components";
import imgAvatarActive from "shared/images/iconos/user-active.svg";

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  width: 68vw;
  height: 121px;
  border-radius: 6px;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border: solid 1px #e8e8e8;
  background-color: #ffffff;
`;

const Avatar = styled.span`
  display: block;
  width: 32px;
  height: 32px;
  background-image: url(${imgAvatarActive});
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 18px;
`;
const InformationDetail = styled.div`
  display: flex;
  color: #696158;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-right: 5px;
`;


const ButtonGroup = styled.div`
  display: flex;
`;
  const ButtonStatus = styled.button`
  width: 105px;
  height: 32px;
  border-radius: 6px;
  border: solid 1.4px #00a499;
  margin-right: 10px;
  background-color: ${props => (props.status ? "#00a499" : "#f7f7f8")};
  color: ${props => (props.status ? "#ffffff" : "#00a499")};
  `;

const CardHeader = ({ name, rol, status,sendStatus }) => {
  const [executiveStatus, setExecutiveStatus] = useState(status);
  const [activeButton, setActiveButton] = useState(status === "1" ? true: false);

  const handleEnableExecutive=()=>{
    setExecutiveStatus("1");
    setActiveButton(true);
  }
  const handleDisabledExecutive=()=>{
    setExecutiveStatus("0");
    setActiveButton(false);
  }

  useEffect(() => {
    sendStatus(executiveStatus);

  }, [executiveStatus]);


  return( 
     <>
    <Information>
      <InformationDetail>
        <Avatar></Avatar>
        <Detail>
          <b><span>{name}</span></b>
          <span>{rol}</span>
        </Detail>
      </InformationDetail>
      <ButtonGroup>
        <ButtonStatus onClick={handleEnableExecutive} status={activeButton}>Activo</ButtonStatus>
        <ButtonStatus onClick={handleDisabledExecutive} status={!activeButton}>Inactivo</ButtonStatus>
      </ButtonGroup>
    </Information>
  </>
  );

}


export default CardHeader;
