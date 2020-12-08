import React, { useEffect, useState , useRef} from 'react';
import { allColors } from 'global/styles/index';
import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import './styles.scss';
import showPasswordIcon from 'shared/images/showPasswordIcon.svg';
import hidePasswordIcon from 'shared/images/hidePasswordIcon.svg';

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

const ErrorContainer = styled.div`
    position: relative;
`;

const ErrorStaticContainer = styled.div`
  position: absolute;
  @media screen and (max-width: ${size.tabletM})  {
    position: relative;
  }
`;

const InputBtnComponent = ({ show = true, showBtnIcon = true, handleInputButton, btnIcon }) => {
    if (!show || !showBtnIcon) return <></>;
    return (
       <InputBtn onClick={handleInputButton} type="button">
          <img className="input-button-icon" src={btnIcon} />
        </InputBtn>
    )
}

const MaterialInput = ({
    initialValue = '',
    type = 'text',
    placeholder = '',
    containerStyles = {},
    onChange,
    autoComplete = "off",
    name = '',
    getTarget = false,
    register,
    className = '',
    capitalizeInput = false,
    inputRealPlaceholder = '',
    showDateMask = false,
    error,
    staticError = true,
    numericInput = false,
    reset
}) => {
    const showRightButton = (type === 'password');
    const [labelColor, setLabelColor] = useState(allColors.colorPlaceholder);
    const [inputColor, setInputColor] = useState(allColors.colorGrayLight);
    const [showBtnIcon, setShowButtonIcon] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showLabelClass, setShowLabelClass] = useState('');
    const [inputValue, setInputValue] = useState(initialValue);
    const inputRef = useRef(null);

    const validateDefaultState = () => {
        const getElementByName = document.getElementById(name);
        const inputValueId = getElementByName?.value ?? null;
        if (inputValue) setInputValue(inputValue);
        if (inputValueId) setInputValue(inputValueId);
        if (inputValue || inputValueId) {
            setLabelColor(allColors.colorGrayText);
            setShowLabelClass('show-label');
        }
    }

    useEffect(validateDefaultState, []);

    useEffect(() => {
        if (onChange) onChange(getTarget ? getInputState() : inputValue);
        if (inputValue.length && !showBtnIcon) return setShowButtonIcon(true);
        if (!inputValue.length) setShowButtonIcon(false);
    }, [inputValue]);

    useEffect(() => {
       if (!reset) return;
       setInputValue('');
       setLabelColor(allColors.colorPlaceholder);
       setInputColor(allColors.colorGrayLight);
       setShowLabelClass('');
    }, [reset]);

    const handleInputButton = () => {
        setShowPassword(!showPassword);
    }

    const getInputState = () => ({
        target: { name, value: inputValue, type }
    });

    const handleOnFocus = () => {
        setLabelColor(allColors.colorOrangeMain);
        setInputColor(allColors.colorOrangeMain);
        setShowLabelClass('show-label');
    }

    const handleOnBlur = () => {
        setLabelColor(inputValue ? allColors.colorGrayText : allColors.colorPlaceholder);
        setInputColor(allColors.colorGrayLight);
        inputValue ? setShowLabelClass('show-label') : setShowLabelClass('');
    }

    const handleOnKeyUp = (event) => {
        const getElementByName = document.getElementById(name);
        const inputValueId = getElementByName?.value ?? null;
        if (inputValueId) {
            if (inputValueId.match(/^\d{2}$/) !== null) {
                getElementByName.value = inputValueId + '/';
            } else if (inputValueId.match(/^\d{2}\/\d{2}$/) !== null) {
                getElementByName.value = inputValueId + '/';
            }
        }
    }

    const handleChange = (event) => {
        setInputValue(capitalizeInput ? event.target.value.toUpperCase() : event.target.value);
    }

    const inputProps = register ? (showDateMask ? { onKeyUp : handleOnKeyUp } : {}) : { value: inputValue };

  return (
    <div style={{ ...containerStyles }} className={className}>
        <div style={{ borderColor: inputColor }} className="group">      
            <input
                id={name}
                className={`material-input ${capitalizeInput ? 'capitalize' : ''}`}
                style={{ marginRight: showRightButton ? '0px' : '15px' }}
                onChange={handleChange}
                {...inputProps}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                autoComplete={autoComplete}
                placeholder={inputRealPlaceholder}
                name={name}
                type={showPassword ? 'text' : type}
                ref={register}
            />
            <label
              className={`material-input-label ${showLabelClass}`}
              style={{ color: labelColor }}
            >
              <p className={`label-text`}>{placeholder}</p>
            </label>
            <InputBtnComponent
                show={showRightButton}
                handleInputButton={handleInputButton}
                showBtnIcon={showBtnIcon}
                btnIcon={showPassword ? hidePasswordIcon : showPasswordIcon}
            />
        </div>
        { (error && staticError) && <ErrorStaticContainer>{error}</ErrorStaticContainer>}
        { (error && !staticError) && <ErrorContainer>{error}</ErrorContainer>}
    </div>
  )
};

export default MaterialInput;
