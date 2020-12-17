import styled from "styled-components";

export const ContainerTwo = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 2px 40px 1px rgba(103, 103, 103, 0.12);
  border-radius: 14px;
  padding: 20px 40px;
  min-width: 992px;
`;

export const Tittle = styled.h1`
  font-family: Calibri;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 20px;
  color: #00a499;
  margin-bottom: 20px;
`;

export const DetailContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-areas:
    "Card1 Card2"
    "Card3 Card3";
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;
  grid-row-gap: 2%;
`;
export const Card1 = styled.div`
  grid-area: Card1;
`;
export const Card2 = styled.div`
  grid-area: Card2;
`;
export const Card3 = styled.div`
  grid-area: Card3;
`;

export const ContainerButtonSave = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 87px 10px;
`;
export const ButtonSave = styled.button`
  font-family: Calibri;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  width: 216px;
  height: 44px;
  border-radius: 4px;
  background-color: #ff4f00;
  color: #ffffff;
`;
