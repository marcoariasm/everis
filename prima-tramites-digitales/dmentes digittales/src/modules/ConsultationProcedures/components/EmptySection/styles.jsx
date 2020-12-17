import styled from "styled-components";

export const ContainerEmptySection = styled.div`
  display: flex;
  padding: 4em 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 30vh;
  border-radius: 6px;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border: solid 1px #e8e8e8;
  background-color: #ffffff;

  > p {
    margin: 2em;
    opacity: 0.6;
    font-family: FSEmeric;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: #696158;
  }
`;
