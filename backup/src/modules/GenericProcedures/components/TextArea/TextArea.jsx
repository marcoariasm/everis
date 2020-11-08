import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { allColors } from 'shared/styles/index'

const TextAreaContainer = styled.div`
    width: 100%;
    margin: 38px 0;
    > label {
        display: block;
        width: 100%;
        color: ${allColors.colorGrayText};
        font-size: 12px;
        margin: 8px 0;
    }
    > textarea {
        display: block;
        width: 100%;
        border-radius: 6px;
        border: solid 1px ${allColors.colorTooltip};
        margin-bottom: 20px;
        resize: none;
        font-family: Calibri;
        padding: 4px 4px;
        font-size: 16px;
        color: ${allColors.colorGrayText};
        outline-color: ${allColors.colorOrangeMain} !important;
    }

`

export default function TextArea({ label = '', onChange, value }) {
   const [textAreaValue, setValue] = useState();

   useEffect(() => {
     if (onChange) onChange(textAreaValue);
   },[textAreaValue]);

   const handleChange = (event) => {
       setValue(event.target.value)
   }

    return (
        <TextAreaContainer>
            <label htmlFor="textf1">{label}</label>
            <textarea name="textf1" id="" cols="" rows="5" value={textAreaValue} onChange={handleChange}></textarea>
        </TextAreaContainer>
    )
}
