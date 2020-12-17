import React, { Fragment } from 'react'
import Button from './Button'

const Operations = ({ onClickOperation }) => {
    return (
        <Fragment>
            <Button onClickOperation={onClickOperation}
                text={'+'} />
            <Button onClickOperation={onClickOperation}
                text={'-'} />
        </Fragment>
    )
}

export default Operations