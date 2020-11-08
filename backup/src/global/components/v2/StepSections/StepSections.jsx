import React from 'react';
import styled from 'styled-components';
import { allColors } from 'global/styles/index';

// type stepSections: [{title: 'string', text: ['string']}]

export const ContainerStep = styled.div`
    &:not(:last-child){
        border-bottom: 1px solid ${allColors.colorGrayBorder};
        margin-bottom: 1em;
        padding-bottom: 1em;
    }
`;

const StepSections = ({ value }) => {
    return (
        <>
            {value.map((item, i) => (
                <ContainerStep key={i}>
                    <strong>
                        {item.title}
                    </strong>
                    <br/><br/>
                    {item.text.map((text, j) => (
                        <p key={j}>
                            {text}
                        </p>
                    ))}
                </ContainerStep>
            ))}
        </>
    )
}

export default StepSections;