import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppModule from 'modules/App/index';
import Retirement955Module from 'modules/Retirement955/index';
import ProceduresModule from "modules/procedures/index";
import AuthModule from 'modules/PacAuth/index';
import HomeModule from 'modules/Dashboard';

const { AppRouter } = AppModule.router;
const { AuthRouter } = AuthModule.router;

const Retirement955ModuleRouter = Retirement955Module.moduleRouter;
const HomeModuleRouter = HomeModule.moduleRouter;
const ProceduresModuleRouter = ProceduresModule.moduleRouter;

const App = () => {
  const modules = [
    HomeModuleRouter,
    Retirement955ModuleRouter,
    ProceduresModuleRouter
  ];
  return (
    <BrowserRouter>
      <AuthRouter />
      <AppRouter
        modules={modules}
      />
    </BrowserRouter>
  );
};

export default App;
