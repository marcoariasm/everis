import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import ValidationRuc from 'pages/ValidationRuc/ValidationRuc'
import ValidationPrerequisites from 'pages/ValidationPrerequisites/ValidationPrerequisites'
import RegisteredAdvice from 'pages/RegisteredAdvice'
import NotAccess from 'pages/NotAccess'
import HomeAdvice from 'pages/HomeAdvice/HomeAdvice'
import DataValidation from 'pages/DataValidation/DataValidation'
import CompletionOfAdvisory from 'pages/CompletionOfAdvisory/CompletionOfAdvisory'
import Advisory from 'pages/Advisory/Advisory'
import React from 'react'
import { isEmpty, prop } from 'ramda'

import usePerfilamiento from 'modules/Retirement955/api/Perfilamiento/usePerfilamiento'

const Retirement95Router = () => {
  const { path } = useRouteMatch()
  const { profiling, isError } = usePerfilamiento()
  const hasProfilingInfo = () => !isEmpty(profiling)
  const hasNotAccessInfo = () => prop('status', isError) === 412

  return (
    <>
      {hasProfilingInfo() && <Redirect to={`${path}/validation-prerequisites`} />}
      {hasNotAccessInfo() && <Redirect from={`${path}`} to={`${path}/not-access`} />}
      <Switch>
        <Route exact path={`${path}/validation-ruc`} component={ValidationRuc} />
        <Route exact path={`${path}/validation-prerequisites`} component={ValidationPrerequisites} />
        <Route exact path={`${path}/registeredAdvice`} component={RegisteredAdvice} />
        <Route exact path={`${path}/not-access`} component={NotAccess} />
        <Route exact path={`${path}/homeAdvice`} component={HomeAdvice} />
        <Route exact path={`${path}/dataValidation`} component={DataValidation} />
        <Route exact path={`${path}/completionOfAdvisory`} component={CompletionOfAdvisory} />
        <Route exact path={`${path}/advisory`} component={Advisory} />
      </Switch>
    </>
  )
}

export default Retirement95Router
