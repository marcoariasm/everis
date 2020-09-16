import React from "react";
import PropTypes from "prop-types";
import Button from './button/Button'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const renderButtons = (onClickNumber) => {
  // <Button text="1" clickHandler={onClickNumber}/>
  // let number = 0
  // <Button text={} clickHandler={onClickNumber}/>
  const renderButton = (number) => (
      <Button 
        text={number.toString()} 
        clickHandler={onClickNumber} 
        key={number}/>
  )
  return numbers.map(renderButton)
}

const Numbers = ({ onClickNumber }) => {
  return (
    <section className="numbers">
      {/* Reemplazando por una funcion de JSX */}
      {/* <Button text="1" clickHandler={onClickNumber}/>
            <Button text="2" clickHandler={onClickNumber}/>
            <Button text="3" clickHandler={onClickNumber}/>
            <Button text="4" clickHandler={onClickNumber}/>
            <Button text="5" clickHandler={onClickNumber}/>
            <Button text="6" clickHandler={onClickNumber}/>
            <Button text="7" clickHandler={onClickNumber}/>
            <Button text="8" clickHandler={onClickNumber}/>
            <Button text="9" clickHandler={onClickNumber}/>
            <Button text="0" clickHandler={onClickNumber}/> */}
      {renderButtons(onClickNumber)}
    </section>
  );
};

Numbers.propTypes = {
  text: PropTypes.string,
};

export default Numbers;
