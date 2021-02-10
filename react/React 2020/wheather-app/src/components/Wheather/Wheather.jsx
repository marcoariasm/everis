import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const Wheather = ({temperature}) => {
    return (
        <div>
            <Typography variant="h2">{temperature}</Typography>
            
        </div>
    )
}

Wheather.propTypes = {
    temperature: PropTypes.number.isRequired
}

export default Wheather
