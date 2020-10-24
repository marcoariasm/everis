import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

const Container = Styled.div`
  progress {
    margin-right: 8px;
    
  }

  span {
    color: #00A499;
    ont-family: Calibri;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    font-feature-settings: 'pnum' on,'lnum' on;
    position: right;
  }

  progress[value] {
    width: ${props => props.width};

    -webkit-appearance: none;
    appearance: none;
  }

  progress[value]::-webkit-progress-bar {
    height: 10px;
    border-radius: 20px;
    background-color: #C4C4C4;
  }  

  progress[value]::-webkit-progress-value {
    height: 10px;
    border-radius: 20px;
    background-color: ${props => props.color};
  }
`;

const Bar = ({ value, max, color, width }) => {
  return (
    <Container color={color} width={width}>
      <span>cargando... {(value / max) * 100}%</span>
      <progress value={value} max={max} />
    </Container>
  );
};

Bar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.string
};

Bar.defaultProps = {
  max: 100,
  color: "lightBlue",
  width: "250px"
};

export default Bar
