import React from 'react';
import styled from 'styled-components'
import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles'

export const ListUl = styled.div`
  list-style: none;
  font-size: 14px;
  line-height: 1.14;
  margin-left: 20px;
  & ul > li::before {
    content: '•';
    color: ${allColors.colorOrangeMain};
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

// type list: [ 'string', 'string']

const List = ({ value }) => {
    return (
        <ListUl className="bodyText">
            <ul>
                {value.map((text, i) => (
                    <li key={i}>
                        <span>{text}</span>
                    </li>

                ))}
            </ul>
        </ListUl>

    )
}

export default List;