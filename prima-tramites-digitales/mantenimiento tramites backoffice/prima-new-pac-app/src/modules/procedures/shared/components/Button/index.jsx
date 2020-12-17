import React from "react";
import Button from "global/components/v1/Button/Button";
import "./button.scss";

const index = ({ textBtn, disabled = false, onClickButton }) => {
  return (
    <Button
      className="list-procedure-button"
      disabled={disabled}
      onClick={onClickButton}
    >
      {textBtn}
    </Button>
  );
};

export default index;
