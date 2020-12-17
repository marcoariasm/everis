import ServiceFetcher from 'modules/shared/libs/ServiceFetcher';

export const ServiceAuth = (username, password) => ServiceFetcher(
  `${process.env.REACT_APP_API_PROCEDURES}/auth/login`,
  {
    method: 'POST',
    body: {
      username,
      password,
    },
  },
);
