 import React from 'react';
import styled from 'styled-components';
import RadioButtonList from '../RadioButtonList';


 export const AnnounceContainer = styled.div`
  border-radius: 6px;
  border: 1px solid #00ae99;
  padding: 1em 4em;
  display: grid;
  placeItems: center;
  margin: 2em 0;
`;

export const Announcement = styled.p`
  font-size: 16px;
  font-family: 'Calibri';
  color: #00A499;
  font-weight: bold;
`;

export const RadioButtonTitle = styled.p`
  font-family: 'Calibri';
  font-size: 14px;
  margin-top: 1.8em;
  color: #696158;
`;

export const ItemTitle = styled.p`
  color: #696158;
  font-size: 12px;
  font-family: FS Emeric;
  display: flex;
`;

export const ItemDescription = styled.p`
  color: #696158;
  font-size: 14px;
  font-family: FS Emeric;
  font-weight: bold;
`;
 
 export const Statement = ({ show = false, announcement = '' }) => {
    if (!show) return <></>;
    return <><AnnounceContainer><Announcement>{announcement}</Announcement></AnnounceContainer></>;
}

export const RadioButtonSection = ({ show = true, onChange, title = '', options = [], register, name = '' }) => {
    if (!show) return <></>;
    return <><RadioButtonTitle>{title}</RadioButtonTitle>
    <RadioButtonList name={name} register={register} onChange={onChange} className="radio-button-container" items={options}></RadioButtonList></>
  }

   export const ItemValue = ({ title, value }) => (
    <div>
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{value}</ItemDescription>
    </div>
  )