import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import ValidationRuc from 'modules/Retirement955/pages/ValidationRuc'
import ValidationPrerequisites from 'modules/Retirement955/pages/ValidationPrerequisites'
import RegisteredAdvice from 'modules/Retirement955/pages/RegisteredAdvice'
import NotAccess from 'modules/Retirement955/pages/NotAccess'
import HomeAdvice from 'modules/Retirement955/pages/HomeAdvice/HomeAdvice'
import DataValidation from 'modules/Retirement955/pages/DataValidation'
import CompletionOfAdvisory from 'modules/Retirement955/pages/CompletionOfAdvisory'
import Advisory from 'modules/Retirement955/pages/Advisory'
import React from 'react'
import { isEmpty, isNil, prop } from 'ramda'

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento'
import useFinancialAdvice from 'modules/Retirement955/api/Afiliado/useFinancialAdvice'

const Retirement95Router = () => {
	const { path } = useRouteMatch()
	const { profiling, isError: isErrorProfiling } = usePerfilamiento()
	const { financialAdvice } = useFinancialAdvice()
	const hasProfilingInfo = () => !isEmpty(profiling)
	const hasFinancialAdviceInfo = () => !isNil(financialAdvice)
	const hasNotAccessInfo = () => prop('status', isErrorProfiling) === 412

	return (
		<>
			{hasProfilingInfo() ? (
				hasFinancialAdviceInfo() ? (
					<Redirect to={`${path}/registeredAdvice`} />
				) : (
					<Redirect to={`${path}/validation-prerequisites`} />
				)
			) : (
				<Redirect to={`${path}/validation-prerequisites`} />
			)}
			{hasNotAccessInfo() && <Redirect from={`${path}`} to={`${path}/not-access`} />}
			<Switch>
				<Route exact path={`${path}/validation-ruc`} component={ValidationRuc} />
				<Route exact path={`${path}/validation-prerequisites`} component={ValidationPrerequisites} />
				<Route exact path={`${path}/registeredAdvice`} component={RegisteredAdvice} />
				<Route exact path={`${path}/not-access`} render={
					() => <NotAccess profilingError={isErrorProfiling} />
				} />
				<Route exact path={`${path}/homeAdvice`} component={HomeAdvice} />
				<Route exact path={`${path}/dataValidation`} component={DataValidation} />
				<Route exact path={`${path}/completionOfAdvisory`} component={CompletionOfAdvisory} />
				<Route exact path={`${path}/advisory`} component={Advisory} />
			</Switch>
		</>
	)
}

export default Retirement95Router
