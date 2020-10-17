import React, { useEffect, useState } from "react";
import { allColors } from "shared/styles/index";
import styled from "styled-components";
import "./styles.scss";
import showPasswordIcon from "../../images/showPasswordIcon.svg";
import hidePasswordIcon from "../../images/hidePasswordIcon.svg";

const InputBtn = styled.button`
  outline: none;
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  .input-button-icon {
    display: flex;
  }
`;

const InputBtnComponent = ({
  show = true,
  showBtnIcon = true,
  handleInputButton,
  btnIcon,
}) => {
  if (!show) return <></>;
  return (
    <InputBtn onClick={handleInputButton} type="button">
      {showBtnIcon && <img className="input-button-icon" src={btnIcon} />}
    </InputBtn>
  );
};

const MaterialInput = ({
  initialValue = "",
  type = "text",
  placeholder = "",
  containerStyles = {},
  onChange,
  inputIsDate = false,
}) => {
  const showRightButton = type === "password";
  const [labelColor, setLabelColor] = useState(allColors.colorPlaceholder);
  const [inputColor, setInputColor] = useState(allColors.colorGrayLight);
  const [showBtnIcon, setShowButtonIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);

  const maskDate = (valueInput) => {

    if (valueInput.match(/^\d{2}$/) !== null) {
      return valueInput + "/";
    } else if (valueInput.match(/^\d{2}\/\d{2}$/) !== null) {
      return valueInput + "/";
    }
    return valueInput;
  };

  useEffect(() => {
    if (onChange) onChange(inputValue);
    if (inputValue.length && !showBtnIcon) return setShowButtonIcon(true);
    if (!inputValue.length) setShowButtonIcon(false);
  }, [inputValue]);

  const handleInputButton = () => {
    setShowPassword(!showPassword);
  };

  const handleOnFocus = () => {
    setLabelColor(allColors.colorOrangeMain);
    setInputColor(allColors.colorOrangeMain);
  };

  const handleOnBlur = () => {
    setLabelColor(
      inputValue ? allColors.colorGrayText : allColors.colorPlaceholder
    );
    setInputColor(allColors.colorGrayLight);
  };

  const handleChange = (event) => {
    const inputValue = inputIsDate ? maskDate(event.target.value) : event.target.value;
    setInputValue(inputValue);
  };

  return (
    <form style={{ width: "100%", paddingTop: "1em", paddingBottom: "0.7em", ...containerStyles }}>
      <div style={{ borderColor: inputColor }} className="group">
        <input
          className="material-input"
          maxLength={inputIsDate ? 10 : null}
          style={{ marginRight: showRightButton ? "0px" : "15px" }}
          onChange={handleChange}
          value={inputValue}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          type={showPassword ? "text" : type}
          required
        />
        <label className="material-input-label" style={{ color: labelColor }}>
          {placeholder}
        </label>
        <InputBtnComponent
          show={showRightButton}
          handleInputButton={handleInputButton}
          showBtnIcon={showBtnIcon}
          btnIcon={showPassword ? hidePasswordIcon : showPasswordIcon}
        />
      </div>
    </form>
  );
};

export default MaterialInput;
