import React from "react";
import styled from "styled-components";
import { size } from "shared/styles/Responsive";
import List from "modules/shared/components/List/List";
import Paragraphs from "modules/shared/components/Paragraphs/Paragraphs";
import StepSections from "modules/shared/components/StepSections/StepSections";
import Accordion from "modules/shared/components/Accordion";

const ContentTab = styled.div`
  padding: 2em 3em;
  @media only screen and (max-width: ${size.mobileL}) {
    padding: 1.5em 1em;
  }
`;

function InformativeCards({ information }) {
  const swithTabsAccordion = (item) => {
    switch (item.type) {
      case "list":
        return <List key={item.name} value={item.value} />;
      case "paragraphs":
        return <Paragraphs key={item.name} value={item.value} />;
      case "stepSections":
        return <StepSections key={item.name} value={item.value} />;
      default:
        return <List key={item.name} value={item.value} />;
    }
  };

  return (
    <>
      {information.map((item, i) => (
        <Accordion key={i} title={item.name}>
          <ContentTab>{swithTabsAccordion(item)}</ContentTab>
        </Accordion>
      ))}
    </>
  );
}

export default InformativeCards;
