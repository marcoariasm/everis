import ServiceFetcher from "modules/shared/libs/ServiceFetcher";

export const sendMessage = (formData) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/communication`,
    {
      method: "POST",
      body: formData,
    }
  );
};

export const downloadFileMessage = (payload) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/document-manager/v1/communication/download`,
    {
      method: "POST",
      body: payload,
    }
  );
};

export const downloadFileRequest = (payload) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/document-manager/v1/download`,
    {
      method: "POST",
      body: payload,
    }
  );
};

export const getProcedureListApplicant = (id) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/dashboard/applicant/${id}`,
    {
      method: "GET",
    }
  );
};

export const getProcedureListAffiliate = (id) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/dashboard/affiliate/${id}`,
    {
      method: "GET",
    }
  );
};

export const getProcedureListRepresentative = (id) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/dashboard/affiliate/${id}/representative`,
    {
      method: "GET",
    }
  );
};

export const getProcedureDetail = (id) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/generic/${id}`,
    {
      method: "GET",
    }
  );
};

export const getStatesForTypeProcedure = () => {
  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/status/v1?idTypeRequest=0`,
    {
      method: "GET",
    }
  );
};
