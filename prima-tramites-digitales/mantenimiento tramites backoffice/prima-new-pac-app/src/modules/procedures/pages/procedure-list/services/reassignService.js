import ServiceFetcher from 'modules/shared/libs/ServiceFetcher';


const reassignService = (data) => ServiceFetcher(
  `${process.env.REACT_APP_API_PROCEDURES}/procedure/v1/assignment/reassign`,
  {
    method: 'POST',
    body: data,
  },
);

export default reassignService;
