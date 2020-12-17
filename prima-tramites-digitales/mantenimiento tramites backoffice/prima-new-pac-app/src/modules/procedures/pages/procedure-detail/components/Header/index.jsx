import React from "react";
import styled from "styled-components";

const CardDetail = styled.div`
    display:flex;
    width:382px;
    height:122px;
    justify-content:space-around;
    align-items:center;
    &>div{
    display:flex;
    color:#9d9994;
    flex-direction:column;
    justify-content:center;
    height:100%;
    width:100%;
    border:solid 1px #00ae99;
    align-items:center;
    }
    >div:nth-child(1){
    border-right: none;
    border-radius:6px 0 0 6px ; 
    }
    }
    >div:nth-child(2){
    border-radius:0 6px 6px 0 ;
    }
    &>div>span{
      text-align:center;
      color:#00ae99;
    }
`;

const HedaerProcedure = ({ procedureDetail }) => {
  return (
    <>
      <CardDetail>
        <div>
          <h3>Fecha de registro</h3>
          <span>{procedureDetail.registerDate}</span>
        </div>
        <div>
          <h3>Ejecutivo(a)</h3>
          <span>
            {procedureDetail.executive && procedureDetail.executive.fullNames
              ? procedureDetail.executive.fullNames
              : ""}
          </span>
        </div>
      </CardDetail>
    </>
  );
};

export default HedaerProcedure;
