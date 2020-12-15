import React, { Fragment } from 'react';
import styled from 'styled-components';
import $ from 'global/styles';

import IconAdmiracion from 'shared/images/ADMIRACION.svg';

// const test = [{
//   "text": 'Texto 1'
// },{
//   "text": 'Texto 2',
//   "options": ['Punto A', 'Punto B', 'Punto C']
// }]

const Notification = ({ data = '', radius }) => {
  const notify = () => {
    if (typeof data === 'string') {
      return (
        <Head type="string">
          <Icon src={IconAdmiracion} />
          <span>{data}</span>
        </Head>
      );
    } if (typeof data === 'object') {
      return (
        <>
          <Head>
            <Icon src={IconAdmiracion} />
            <span>Recuerda :</span>
          </Head>
          <ListOl>
            {data.map(({ text, options }, i) => (
              <Fragment key={i}>
                <ListItem options={options} index={i + 1}>{text}</ListItem>
                {options && options.length > 0 && options.map((item, j) => (
                  <ListUl key={j}>
                    <ListItem size={2}>{item}</ListItem>
                  </ListUl>
                )) }
              </Fragment>
            ))}
          </ListOl>
        </>
      );
    }
  };

  return (
    <Wrapper radius={radius}>
      {notify()}
    </Wrapper>
  );
};

export default Notification;

const Wrapper = styled.div`
  position: relative;
  background-color: #fff7d6;
  padding: 22px 47px;
  border-radius: ${(props) => `${props.radius || 0}px`};
`;

const Icon = styled.img`
  padding-right: 10px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: ${$.mainColor2};
  font-weight: bold;
  & > span {
    color: ${(props) => props.type && $.grisClaro};
    font-weight: ${(props) => props.type && '500'};
    letter-spacing: 0.02em;
  }
`;
const ListOl = styled.ol`
  list-style: none;
  & > li {
    counter-increment: li;
    letter-spacing: 0.02em;
    padding-left: 59px;
    &::before {
      position: absolute;
      content: counter(li) ". ";
      color: ${$.mainColor2};
      padding-right: 10px;
      font-weight: bold;
      left: 85px;
    }
  }
`;

const ListItem = styled.li`
  color: ${$.grisClaro};
  font-size: 15px;
  font-weight:  ${(props) => (props.options ? '600' : 'normal')};
  padding: ${(props) => (props.size ? '2px 0px' : '5px 0px')};
`;

const ListUl = styled.ul`
  list-style: none;
  padding-left: 16px;
  letter-spacing: 0.02em;
  height: 25px;
  line-height: 25px;
  & > li {
    &::before {
      content: "•";
      color: ${$.mainColor2};
      padding-right: 12px;
      font-weight: 600;
      font-size: 25px;
      padding-left: 54px;
    }
  }
`;
