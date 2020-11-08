import React from 'react';

// type paragraphs: [{text: 'string, isStrong: boolean}]

const Paragraphs = ({ value }) => {
    return (
        <>
            {value.map((item, i) => (
                <div key={i}>
                    <p>
                        {
                            item.isStrong
                                ? <strong> {item.text}</strong>
                                : item.text
                        }
                    </p>
                    <br />
                </div>
            ))}
        </>
    )
}

export default Paragraphs;