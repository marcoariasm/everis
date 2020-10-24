import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import { size } from 'shared/styles/Responsive'
import AddFile from 'shared/images/file.svg'
import Bar from './Bar'

const Content = styled.div`
  display: grid;
  justify-content: center;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    grid-template-columns: 20% 80%;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    grid-template-columns: 30% 70%;
  }
`
const ContentImage = styled.div`
  text-align: center;
  & > img {
    width: 69px;
    height: 69px;
  }
`
/*const TPrincipal = styled.div`
  text-align: center;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    text-align: left;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 20px;
    line-height: 22px;
    text-align: left;
  }
`
const ContentInfoValidate = styled.div`
  font-size: 18px;
  line-height: 20px;
  text-align: left;
  padding-top: 22px;
`
*/

function Progress() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((oldValue) => {
        const newValue = oldValue + 10;

        if (newValue === 100) {
          clearInterval(interval);
        }
        return newValue;
      });
    }, 100);
  }, []);

  return (
    <Content>
      <ContentImage>
        <img src={AddFile} alt="AddFile" />
      </ContentImage>
          <Bar color={"#00A499"} width={"400px"} value={value} max={100} />    
    </Content>
  )
}

export default Progress
