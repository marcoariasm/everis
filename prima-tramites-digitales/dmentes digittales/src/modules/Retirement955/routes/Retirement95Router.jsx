import { Route, Switch, useRouteMatch, Redirect, Link, useLocation } from 'react-router-dom';
import ValidationRuc from 'modules/Retirement955/pages/ValidationRuc';
import ValidationPrerequisites from 'modules/Retirement955/pages/ValidationPrerequisites';
import RegisteredAdvice from 'modules/Retirement955/pages/RegisteredAdvice';
import NotAccess from 'modules/Retirement955/pages/NotAccess';
import HomeAdvice from 'modules/Retirement955/pages/HomeAdvice/HomeAdvice';
import DataValidation from 'modules/Retirement955/pages/DataValidation';
import CompletionOfAdvisory from 'modules/Retirement955/pages/CompletionOfAdvisory';
import Advisory from 'modules/Retirement955/pages/Advisory';
import React, { useEffect } from 'react';
import { __, any, includes, isEmpty, prop } from 'ramda';

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento';
import useFinancialAdvice from 'modules/Retirement955/api/Afiliado/useFinancialAdvice';

import AppModule from 'modules/App';

const { useModalConfirmLeave } = AppModule.providers.ModalConfirmLeave;

const Retirement95Router = () => {
	const { setHoldNavigation, setConfirmContent } = useModalConfirmLeave();
	const { path } = useRouteMatch();
	const { pathname } = useLocation();
	const { profiling, isError: isErrorProfiling } = usePerfilamiento();
	const { hasFinancialAdviceInfo } = useFinancialAdvice();
	const hasProfilingInfo = () => !isEmpty(profiling);
	const hasNotAccessInfo = () => prop('status', isErrorProfiling) === 412;

	const activeHolding = () => {
		const excludedRoutes = ['not-access', 'registeredAdvice', 'completionOfAdvisory'];
		const hold = !any(includes(__, pathname))(excludedRoutes);
		setHoldNavigation(hold);
	};

	useEffect(() => {
		activeHolding();
		setConfirmContent({
			content: 'No has culminado la Etapa 1 del trámite, si sales se perderá toda la información que has registrado',
		});
		return () => {
			setHoldNavigation(false);
		};
	});

	return (
		<>
			{hasProfilingInfo() ? (
				hasFinancialAdviceInfo ? (
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
				<Route exact path={`${path}/not-access`} render={() => <NotAccess profilingError={isErrorProfiling} />} />
				<Route exact path={`${path}/homeAdvice`} component={HomeAdvice} />
				<Route exact path={`${path}/dataValidation`} component={DataValidation} />
				<Route exact path={`${path}/completionOfAdvisory`} component={CompletionOfAdvisory} />
				<Route exact path={`${path}/advisory`} component={Advisory} />
			</Switch>
		</>
	);
};

export default Retirement95Router;
