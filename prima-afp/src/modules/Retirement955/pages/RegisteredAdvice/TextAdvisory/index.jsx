import React from 'react'

import useGetBusinessDays from 'modules/Retirement955/hooks/useGetBusinessDays'

import { MAIN_MIN_AMOUNT } from 'modules/Retirement955/constants/Parameters'

import { MountMin100K } from '../MountMin100K'
import { MountMax100K } from '../MountMax100K'
import { ByValidation } from '../ByValidation'

import { Content } from './style'
import { isNil } from 'ramda'

export const TextAdvisory = ({
	affiliate,
	infoContact,
	day,
	financialAdviceId,
	financialAdviceDetails,
	dataCoorporation,
}) => {
	const dateFinancial = useGetBusinessDays(day)

	return (
		<>
			<Content>
				{financialAdviceId && isNil(financialAdviceDetails) && <ByValidation />}
				{financialAdviceDetails?.accumulatedFundBalance <= MAIN_MIN_AMOUNT && (
					<MountMin100K
						affiliate={affiliate}
						infoContact={infoContact}
						dateFinancial={dateFinancial}
						day={day}
						financialAdviceDetails={financialAdviceDetails}
						dataCoorporation={dataCoorporation}
					/>
				)}
				{financialAdviceDetails?.accumulatedFundBalance > MAIN_MIN_AMOUNT && (
					<MountMax100K
						affiliate={affiliate}
						infoContact={infoContact}
						day={day}
						dateFinancial={dateFinancial}
						financialAdviceDetails={financialAdviceDetails}
						dataCoorporation={dataCoorporation}
					/>
				)}
			</Content>
		</>
	)
}
