import React from 'react';
import styled from 'styled-components';
import { allColors } from 'shared/styles';
import { size } from 'shared/styles/Responsive';

export const AccordionItemTitle = styled.p`
  color: #696158;
  font-size: 14px;
  font-family: 'Calibri';
  font-weight: bold;
  margin-bottom: 0.5em;
  margin-top: 1em;
  @media screen and (max-width: ${size.mobileL})  {
    margin-top: 0em;
    font-size: 11px;
  }
`;

const ItemText = styled.p`
  @media screen and (max-width: ${size.mobileL})  {
    font-size: 10px;
    line-height: 10px;
  }
`;

const ItemContainer = styled.div`
  padding: 1em 0px;
  @media screen and (max-width: ${size.mobileL})  {
    padding: 0.5em 0;
  }
`;

export const ContainerStep = styled.div`
    &:not(:last-child){
        border-bottom: 1px solid ${allColors.colorGrayBorder};
        margin-bottom: 1em;
        padding-bottom: 1em;
    }
    @media screen and (max-width: ${size.mobileL})  {
        margin-bottom: 0em;
        padding-bottom: 0em;
  }
`;

export const AccordionItem = ({ title, description }) => {
    return <ItemContainer>
        <ItemText className="informationFooterText">{ title }</ItemText>
        <ItemText className="informationFooterText">{ description }</ItemText>
    </ItemContainer>
}

const StepSections = ({ steps }) => {
    return steps.map((step, i) => (
        <ContainerStep key={i}>
            <AccordionItemTitle>{step.title}</AccordionItemTitle>
            {step.items.map((item, j) => <AccordionItem key={j} title={item.title} description={item.description} />)}
        </ContainerStep>
    ));
}

export default StepSections;