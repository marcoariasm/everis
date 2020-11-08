import React from 'react';
import styled from 'styled-components';
import { size } from '../../../../../../global/styles/Responsive';
import { allColors } from '../../../../../../global/styles/index';

export const ListUl = styled.div`
  list-style: none;
  font-size: 14px;
  line-height: 1.14;
  margin-left: 20px;
  & ul > li::before {
    font-size: 16px;
    content: '•';
    color: ${props => props.color};
    margin-right: 15px;
  }
  & ul > li {
    text-indent: -1.4em;
    margin-bottom: 15px;
    span {
      font-size: 14px;
      line-height: 1.14;
      @media only screen and (min-width: ${size.mobileS}) and (max-width: ${size.laptop}) {
        line-height: 22px !important;
      }
      @media screen and (max-width: 425px)  {
        font-size: 11px;
        line-height: 5px !important;
        margin: 0;
      }
    }
  }
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    font-size: 16px;
    & ul > li {
      margin-bottom: 5px;
    }
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 18px;
    line-height: 25px;
  }
`

/**
   * Returns list of bulleted items
	 * @component
	 * @param {string[]} textList - Array of strings
	 * @return {ListUl}
	 */
const BulletedList = ({ textList, color = allColors.colorOrangeMain }) => {
    return (
        <ListUl color={color} className="bodyText">
            <ul>{textList.map((text, i) => <li key={i}><span>{text}</span></li>)}</ul>
        </ListUl>
    )
}

export default BulletedList;