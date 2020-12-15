import React, { useState } from "react";
import styled from "styled-components";
import allColors from "global/styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextareaResponse = styled.textarea`
  margin-top: 0.5em;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  width: 100%;
  height: ${({ height }) => `${height}px`};
  outline: none;
  resize: none;
  color: #696158;
  font-size: 16px;
  font-family: Calibri;
  padding: 7px 2em;
  overflow: auto;
  &::-webkit-input-placeholder {
    color: ${allColors.colorGrayText};
  }
`;
const Label = styled.label`
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #9d9994;
`;

const TextArea = ({ height, placeholder, currentValue, labelValue, hidden }) => {
  const [currentNote, setCurrenNote] = useState(currentValue);

  const handleChange = (e) => {
    e.preventDefault();
    setCurrenNote(e.target.value.trimStart());
  };

  return (
    <>
      <Container>
        <Label>{labelValue}</Label>
        <TextareaResponse
          onChange={handleChange}
          placeholder={placeholder}
          height={height}
          value={currentNote}
          hidden={hidden} 
        ></TextareaResponse>
      </Container>
    </>
  );
};

export default TextArea;
