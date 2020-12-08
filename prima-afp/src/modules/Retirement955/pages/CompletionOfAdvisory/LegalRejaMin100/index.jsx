import React from 'react'

import { CompletionAdvisory } from 'modules/Retirement955/constants/ConstantCompletionOfAdvisory'
import { profilingValue } from 'modules/Retirement955/constants/Parameters'

import { ContentText } from './style'

export const LegalRejaMin100 = ({ days, email, profile, hasRuc }) => {
	return (
		<>
			{profile === profilingValue[0].value && (
				<ContentText>
					<span className='bodyText'>
						{hasRuc === true && <span>{CompletionAdvisory.dataRejaConRuc}</span>}
						{hasRuc === false && <span>{CompletionAdvisory.dataRejaSinRuc}</span>}
						{days}
						{CompletionAdvisory.rejaText}
						{email}.
					</span>
					<span className='bodyText'>{CompletionAdvisory.rejaText2}</span>
				</ContentText>
			)}
			{(profile === profilingValue[1].value ||
				profile === profilingValue[2].value ||
				profile === profilingValue[3].value) && (
				<ContentText>
					<span className='bodyText'>
						{CompletionAdvisory.dataLegalMin100}
						{email}.
					</span>
					<span className='bodyText'>
						{CompletionAdvisory.dataLegalMin1002}
						<br />
						{CompletionAdvisory.dataLegalMin1003}
					</span>
				</ContentText>
			)}
		</>
	)
}
