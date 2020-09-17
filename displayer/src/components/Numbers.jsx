import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import Button from './Button'
// import './../App.css'

const Numbers = ({value, clickHandler}) => {

    const clickHandler = (text) => {

    }

    return (
        <Fragment>
            <Button text={value} onClickHandler={() => clickHandler(value)}/>
        </Fragment>
    )
}

// Numbers.propTypes = {

// }

export default Numbers