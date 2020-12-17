// importar React
import React from 'react'
import PropTypes from 'prop-types'
// importando un archivo css
import './Button.css'

// componente funcional
const Button = ({ type, text, clickHandler }) => {
    return (
        <button className={type} onClick={() => clickHandler(text) }>
            <span>{text}</span>
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
}

// exportar
export default Button