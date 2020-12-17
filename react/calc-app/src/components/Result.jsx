import React from 'react'
import PropTypes from 'prop-types'

// componente funcional
const Result = ( { value }) => ( <div className="result"> { value } </div> )

// Se valida que el value venga como string
Result.propTypes = {
    value: PropTypes.string.isRequired
}

Result.defaultProps = {
    value: "0"
}

// exportación del componente
export default Result