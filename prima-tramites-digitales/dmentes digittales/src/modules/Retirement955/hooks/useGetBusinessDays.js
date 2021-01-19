import * as moment from 'moment-business-days'

import { HOLIDAYS } from 'modules/Retirement955/constants/Parameters'
import useInformation from '../api/Globales/useInformation'
import { values } from 'ramda'

const useGetBusinessDays = (day) => {
	const { information } = useInformation(HOLIDAYS)

	moment.updateLocale('es', {
		holidays: values(information),
		holidayFormat: 'DD-MM-YYYY',
	})

	let diff = moment(new Date(), 'DD-MM-YYYY').businessAdd(day)._d

	return diff
}

export default useGetBusinessDays
