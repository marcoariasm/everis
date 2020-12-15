import ServiceFetcher from 'modules/shared/libs/ServiceFetcher';


export const getDocumentList = () => ServiceFetcher(
  `${process.env.REACT_APP_API_PROCEDURES}/excluded/document/v1`,
  {
    method: 'GET'
  },
);
export const getExecutiveList = () => ServiceFetcher(
  `${process.env.REACT_APP_API_PROCEDURES}/executive/v1/`,
  {
    method: 'GET'
  },
);
export const getProcedureTypeList = () => ServiceFetcher(
  `${process.env.REACT_APP_API_PROCEDURES}/procedure/type/v1/`
);
export const getStatusList = () => ServiceFetcher(
  `${process.env.REACT_APP_API_PROCEDURES}/status/v1?idTypeRequest=0`,
  {
    method: 'GET'
  },
);