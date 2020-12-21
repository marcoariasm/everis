import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Retirement95Module from 'modules/Retirement955/index'
import AppModule from 'modules/App/index'
import HomeModule from 'modules/Dashboard'
import AuthModule from 'modules/PrimaAccountAuth/index'

import GenericProcedureModule from 'modules/GenericProcedures'
import ApplicantAuthModule from 'modules/ApplicantAuth'
import ConsultationProcedureModule from 'modules/ConsultationProcedures'

const { DashboardRouter } = AppModule.router
const { AuthRouter } = AuthModule.router
const { ApplicantAuthRouter } = ApplicantAuthModule.router

const Retirement95ModuleRouter = Retirement95Module.moduleRouter
const HomeModuleRouter = HomeModule.moduleRouter
const GenericProcedureRouter = GenericProcedureModule.moduleRouter
const ConsultationProcedureModuleRouter = ConsultationProcedureModule.moduleRouter

const PrimaWebTransactionalApp = ({ featureModules = [] }) => {
  const modules = [
    HomeModuleRouter,
    Retirement95ModuleRouter,
    GenericProcedureRouter,
    ConsultationProcedureModuleRouter,
    ...featureModules
  ];

  return (
    <BrowserRouter>
      <ApplicantAuthRouter />
      <AuthRouter />
      <DashboardRouter modules={modules} />
    </BrowserRouter>
  )
}
export default PrimaWebTransactionalApp
