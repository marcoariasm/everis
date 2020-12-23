import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

const Button = ({ type, text, clickHandler }) => (
    <button className={type} onClick={() => clickHandler(text)}>
        <span>{text}
        </span>
    </button>
)

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    clickHandler: PropTypes.func.isRequired
}

export default Button