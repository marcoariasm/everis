import React from 'react'

const Result = ({value}) => {
    debugger
    console.log("Renderización de Result")
    return (
        <div className="result">
            <span>{value}</span>
        </div>
    )
}

export default Result