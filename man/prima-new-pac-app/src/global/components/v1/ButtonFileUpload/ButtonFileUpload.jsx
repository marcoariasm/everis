import React from 'react';
import styled from 'styled-components';
import cruzBlanca from 'shared/images/iconos/cruzblanco.svg';

const Button = styled.button`
  background: #FF4F00;
  background-image: url(${cruzBlanca});
  background-repeat: no-repeat;
  background-position: 15px 10px;
  border-radius: 6px;
  font-family: Calibri;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #FFFFFF;
  padding: 10px 25px 10px 40px;
  border: none;
  
  &:focus{
    outline: none;
  }
`;

const ButtonFileUpload = ({ handleFile, icon }) => {
  const randomID = Math.floor(Math.random() * 1000000000);
  const handleClick = () => {
    document.getElementById(`hiddenFileInput-${randomID}`).click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };
  return (
    <>
      <Button onClick={handleClick}>
        {icon ? <img src={icon} alt="Upload File" /> : 'Añadir Documento'}
      </Button>
      <input
        type="file"
        id={`hiddenFileInput-${randomID}`}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default ButtonFileUpload;
