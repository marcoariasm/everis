import React, { useState } from "react";
import styled from "styled-components";
import allColors from "global/styles";
import Input from "global/components/v1/InputMaterial";
import ButtonImage from "global/components/v1/ButtonImagen/ButtonImage";
import TrashIconEnabled from "shared/images/iconos/borrar2.svg";

const Label = styled.label`
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #9d9994;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonAdd = styled.button`
  width: 224px;
  height: 36px;
  border-radius: 6px;
  border: solid 1.4px #00a499;
  background-color: #ffffff;
  color: #00a499;
  margin-bottom: 20px;
`;

const ListStep = ({ list, nameButton, label, newList }) => {
  const [listTemp, setListTemp] = useState(list);

  const handleAddSpecialization = () => {
    const newListTemp = [...listTemp, {}];
    setListTemp(newListTemp);
  };
  const handleDelteSpecialization = (index) => {
    const clone = listTemp.filter((e, ix) => ix != index);
    setListTemp(clone);
  };
  const handleDocument = (e, index) => {
    const clone = [...listTemp];
    clone[index].nameStage = e.target.value;
    setListTemp(clone);
  };
  return (
    <>
      <Container>
        <Label>{label}</Label>
        {listTemp &&
          listTemp.map((data, index) => (
            <ContainerRow key={index}>
              <Input
                value={data.nameStage}
                onChange={(e) => handleDocument(e, index)}
              />
              <ButtonImage
                bcolor="#fff"
                color="#696158"
                width="35px"
                style={{ marginBottom: "6px" }}
                onClick={() => handleDelteSpecialization(index)}
                icon={TrashIconEnabled}
              />
            </ContainerRow>
          ))}
        <ButtonAdd onClick={handleAddSpecialization}>{nameButton}</ButtonAdd>
      </Container>
    </>
  );
};

export default ListStep;
