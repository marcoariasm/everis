import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import Button from './Button'
// import './../App.css'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

const renderButtons = (onClickNumber) => {
    const render = (number) => {
        return (
            <Button value={number}
                onClickNumber={onClickNumber} />)
    }
    return numbers.map(render)
}

const Numbers = ({ onClickNumber }) => {

    return (
        <Fragment>
            {renderButtons(onClickNumber)}
        </Fragment>
    )
}

export default Numbers