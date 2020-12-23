import React from 'react'
import Button from './Button'
import PropTypes from 'prop-types'


const Numbers = ({ onClickNumber }) => {

    const arrayButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    
    const render = (onClickNumber) => {
        return (
            arrayButtons.map(
                _ => {
                    return (
                    <Button
                        key={_}
                        text={_.toString()}
                        clickHandler={onClickNumber}
                    />)
                }
            )
        )
    }


    return (

        <section className="numbers">
            {render(onClickNumber)}
        </section>
    )
}

Numbers.propTypes = {
    onClickNumber: PropTypes.func.isRequired,
}

export default Numbers;