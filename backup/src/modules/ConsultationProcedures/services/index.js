import ServiceFetcher from 'modules/shared/libs/ServiceFetcher';
const token =
  'eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJQUklNQSBBRlAiLCJzdWIiOiI0MDYxNDQ0NyIsImF1ZCI6IkFQUExJQ0FOVCIsImlzcyI6IlBSSU1BIEFGUCIsImlhdCI6MTYwNDY3NjU5MiwiZXhwIjoxNjA0Njc4MzkyLCJkb2N1bWVudFR5cGUiOjEsImRvY3VtZW50TnVtYmVyIjoiNDA2MTQ0NDciLCJpZEFwcGxpY2FudCI6MX0.WvGO9hvJJm8VLNFd0UlGpvE_f3pLaUoKRVfuE6COQA0gBch4gwV28XLUDrwV1nTrIy7y2rEFqDqB0wMrJoozq9boZdR1RwmVO-jy0nD72R24LE5dpubzrYfzYW5hrow59zP4wvEJSRW4QZFngtT-IBtLj6zk-NiiGcfUix7D2VMGiZPb_eChIQKOq5LV4KHKWDZYH9hnwh8QAcUPsHJnnSwn2jmzhHNL-jcVL-CPsAEYGNetAOERp99f-JrIujQ_KjvTxI_bFEFyjnbsLnJlflnxIb1R3Z1IHAVENCktBG7VKTCVeAXqQk_puYH2S8vdWRGr4WGFM62aT5kI6zF7MQ';

export const sendMessage = (formData) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/communication`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  )
};

export const downloadFileMessage = (payload) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/document-manager/v1/communication/download`,
    {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  )
};

export const downloadFileRequest = (payload) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/document-manager/v1/download`,
    {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  )
};

export const getProcedureListApplicant = () => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/dashboard/applicant/1`,
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    }
  );
};

export const getProcedureListAffiliate = () => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/dashboard/affiliate/006635MRVNF5`,
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    }
  );
};

export const getProcedureListRepresentative = () => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/dashboard/affiliate/006635MRVNF5/representative`,
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    }
  );
};

export const getProcedureDetail = (id) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/generic/${id}`,
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    }
  );
};
