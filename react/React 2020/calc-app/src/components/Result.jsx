import React from 'react';

const Result = ({ value }) => {
    // debugger
    console.log("renderización de Result", value);
    return (
        <div className="result">
            {value}
        </div>
    )
}

export default Result;