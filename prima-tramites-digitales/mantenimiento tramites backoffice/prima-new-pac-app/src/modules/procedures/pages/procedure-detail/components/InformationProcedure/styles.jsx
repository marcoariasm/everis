import styled from "styled-components";

export const ContentTab = styled.div`
  padding: 1em 1.5em;
  &.document-container {
    > div {
      width: 100%;
    }
  }
`;

export const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 4%;
  padding-bottom: 1.4em;
`;

export const ContactTitle = styled.p`
  color: #696158;
  font-size: 12px;
  font-family: FS Emeric;
  display: flex;
  padding-bottom: 5px;
`;

export const ContactDescription = styled.p`
  color: #696158;
  font-size: 14px;
  font-family: FS Emeric;
  font-weight: bold;
`;
