import styled from 'styled-components';
import { allColors } from '../../../styles/index';


export const ChexkboxLabel = styled.label`
    position: relative;
    cursor: pointer;
    font-family: 'Calibri';
    font-size: 14px;
    font-weight: 600;
    padding: 0 0.44em 0;
    user-select: none;
    display: flex;
    justify-content: flex-start;
    color: ${allColors.colorGrayText};
    &:before {
        position: absolute;
        content: attr(data-content);
        clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
        text-decoration: line-through;
        text-decoration-thickness: 3px;
        transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;

export const CheckboxContainer = styled.div`
    font-family: 'Calibri';
    display: flex;
    display: grid;
    grid-template-columns: 1.38em auto;
    column-gap: 5px;
    align-items: center;
`;

export const CheckboxSquare = styled.input`
    position: relative;
    width: 1.38em;
    height: 1.38em;
    color: black;
    border: 2px solid ${allColors.colorGrayDisabled};
    border-radius: ${props => props.radio ? '50px' : '4px'};
    appearance: none;
    outline: 0;
    cursor: pointer;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
    &::before {
        position: absolute;
        content: '';
        display: block;
        top: -1.5px;
        left: 4px;
        width: 7px;
        height: 14px;
        border-style: solid;
        border-color: white;
        border-width: 0 2px 2px 0;
        border-radius: 1px;
        transform: rotate(45deg);
        opacity: 0;
    }
    &:checked {
        color: white;
        border-color: ${allColors.colorOrangeMain};
        background: ${allColors.colorOrangeMain};
        &::before {
            opacity: 1;
        }
    }
`;