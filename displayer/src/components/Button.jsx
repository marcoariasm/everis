import { number } from 'prop-types'
import React from 'react'

const Button = ({value, onClickNumber}) => {
    return (
        <button onClick={() => onClickNumber(value)}>
            {value}
        </button>
    )
}

export default Button