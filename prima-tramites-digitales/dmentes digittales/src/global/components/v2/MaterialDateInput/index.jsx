import React, { useEffect, useState , useRef} from 'react';
import { allColors } from 'global/styles/index';
import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import './styles.scss';

const deletingKey = 'Backspace';
const ArrowLeftKey = 'ArrowLeft';

const SlashDate = styled.span`
  display: grid;
  place-items: center;
  color: ${allColors.colorPlaceholder};
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 11px;
`;

const ErrorContainer = styled.div`
    position: relative;
`;

const isValidValue = (event) => {
  const regexNumber = /^\d+$/;
  return regexNumber.test(event.target.value) || event.target.value.length === 0;
} 

const isGoingToPreviousInput = (event) => {
  const inputPosition = event.target.selectionStart;
  return (inputPosition === 0 && event.key === deletingKey) || (event.key === ArrowLeftKey && inputPosition === 0);
}

const isGoingToNextInput = (event) => {
  return event.target.selectionStart === 2 && event.key !== ArrowLeftKey; 
}

const MaterialDateInput = ({
    initialValue = '',
    type = 'text',
    placeholder = '',
    containerStyles = {},
    onChange,
    name = '',
    getTarget = false,
    register, 
    className = '',
    error,
    disabled = false,
    reset = 0
}) => {
    const initialDate = initialValue.split('-');
    const [defaultValue, setDefaultValue] = useState(initialValue.split('-'))
    const [labelColor, setLabelColor] = useState(allColors.colorPlaceholder);
    const [inputColor, setInputColor] = useState(allColors.colorGrayLight);
    const [showLabelClass, setShowLabelClass] = useState('');
    const [dayValue, setDayValue] = useState(initialDate[2] || '');
    const [monthValue, setMonthValue] = useState(initialDate[1] || '' );
    const [yearValue, setYearValue] = useState(initialDate[0] || '');
    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const onChangeHandler = () => {
      const inputCompleteValue = `${dayValue}/${monthValue}/${yearValue}`;
      if (onChange) onChange(getTarget ? getInputState(inputCompleteValue) : inputCompleteValue);
    }

    useEffect(() => {
      if (dayValue || monthValue || yearValue) {
        setShowLabelClass('show-label');
        setLabelColor(allColors.colorGrayText);
      }
    },[]);

    useEffect(() => {
      if (reset) {
       setDayValue('');
       setMonthValue('');
       setYearValue('');
       setLabelColor(allColors.colorPlaceholder);
       setInputColor(allColors.colorGrayLight);
       setShowLabelClass('');
      }
    }, [reset]);

    useEffect(onChangeHandler, [dayValue]);
    useEffect(onChangeHandler, [monthValue]);
    useEffect(onChangeHandler, [yearValue]);

    const getInputState = (value) => ({
        target: { name, value, type, numericValue: `${dayValue}${monthValue}${yearValue}` }
    });

    const handleOnFocus = () => {
        setLabelColor(allColors.colorOrangeMain);
        setInputColor(allColors.colorOrangeMain);
        setShowLabelClass('show-label');
    }

    const handleOnBlur = () => {
        const hasInputContent = dayValue || monthValue || yearValue;
        setLabelColor(hasInputContent ? allColors.colorGrayText : allColors.colorPlaceholder);
        setInputColor(allColors.colorGrayLight);
        hasInputContent ? setShowLabelClass('show-label') : setShowLabelClass('');
    }

    const handleDay = (event) => {
      if (isValidValue(event)) return setDayValue(event.target.value);
    }

    const handleMonth = (event) => {
      if (isValidValue(event)) return setMonthValue(event.target.value);
    }
    
    const handleYear = (event) => {
      if (isValidValue(event)) return setYearValue(event.target.value);
    }

    const dayKeyUpHandler = (e) => {
      if (isGoingToNextInput(e)) monthRef.current.focus();
    }

    const monthKeyUpHandler = (e) => {
      if (isGoingToNextInput(e))  yearRef.current.focus();
      if (isGoingToPreviousInput(e)) dayRef.current.focus();
    }

    const yearKeyUpHandler = (e) => {
      if (isGoingToPreviousInput(e)) monthRef.current.focus();
    }

  return (
    <>
    <div style={{ ...containerStyles }} className={className}>
        <input
          id={`date-input-${name}`}
          name={name}
          value={`${dayValue}/${monthValue}/${yearValue}`}
          ref={register}
          onChange={() => {}}
          style={{ display: 'none' }}
          disabled={disabled}
        />
        <div style={{ borderColor: inputColor }} className="group-date-inputs">   
                <input
                  value={dayValue}
                  onChange={handleDay}
                  placeholder={'dd'}
                  maxLength="2"
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onKeyDown={dayKeyUpHandler}
                  className="material-input-date date-input"
                  style={{ maxWidth: '50px' }}
                  ref={dayRef}
                  disabled={disabled}
                />
                <SlashDate>/</SlashDate>
                <input
                  value={monthValue}
                  onChange={handleMonth}
                  placeholder={'mm'}
                  maxLength="2"
                  onKeyDown={monthKeyUpHandler}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  className="material-input-date date-input"
                  style={{ maxWidth: '50px' }}
                  ref={monthRef}
                  disabled={disabled}
                />
                <SlashDate>/</SlashDate>
                <input
                  value={yearValue}
                  onChange={handleYear}
                  placeholder={'aaaa'}
                  maxLength="4"
                  onKeyDown={yearKeyUpHandler}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  className={`material-input-date date-input year-input ${showLabelClass === '' ? 'hide-placeholder' : ''}`}
                  ref={yearRef}
                  disabled={disabled}
                />
            <label
              className={`material-input-label ${showLabelClass}`}
              style={{ color: labelColor }}
            >
              <p className="label-text-date">{placeholder}</p>
            </label>
        </div>
    { error && <ErrorContainer> <ErrorText className={className}>{error}</ErrorText> </ErrorContainer>}
    </div>
    </>
  )
};

export default MaterialDateInput;