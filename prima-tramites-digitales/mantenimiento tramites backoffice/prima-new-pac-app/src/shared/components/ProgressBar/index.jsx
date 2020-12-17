import React from "react";
import styled from "styled-components";
import "./styles.scss";

const ProgressBarContainer = styled.div`
  padding: 1.5em 1em 0.5em 1em;
  width: 100%;
  border-top: 1px solid #cfcfcf;
  margin-top: 1.8em;
`;

const ProgressLine = styled.div`
  background-color: #d8d8d8;
  display: -webkit-flex;
  display: flex;
  border-radius: 50px;
  &:before {
    background-color: ${(props) => props.color || "#00ae99"};
  }
`;

const ProgressBar = ({ color }) => (
  <ProgressBarContainer>
    <ProgressLine color={color} className="progress-line"></ProgressLine>
  </ProgressBarContainer>
);

export default ProgressBar;
