import ServiceFetcher from 'modules/shared/libs/ServiceFetcher';

const procedureTrayService = (data) => ServiceFetcher(
  `${process.env.REACT_APP_API_PROCEDURES}/procedure/v1/tray`,
  {
    method: 'POST',
    body: data,
  },
);

export default procedureTrayService;