import ServiceFetcher from "modules/shared/libs/ServiceFetcher";

export const sendMessage = (formData) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/procedure/v1/communication`,
    {
      method: "POST",
      body: formData,
    }
  );
};

export const downloadFileMessage = (payload) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/document-manager/v1/communication/download`,
    {
      method: "POST",
      body: payload,
    }
  );
};

export const downloadFileRequest = (payload) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/document-manager/v1/download`,
    {
      method: "POST",
      body: payload,
    }
  );
};

export const getProcedureDetail = (id) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/procedure/v1/generic/${id}`,
    {
      method: "GET",
    }
  );
};

export const changeProcedureState = (id, payload) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/procedure/v1/generic/${id}/status/`,
    {
      method: "PUT",
      body: payload,

    }
  );
};

export const changeInternalComment = (id, payload) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/procedure/v1/generic/${id}`,
    {
      method: "PUT",
      body: payload,
    }
  );
};

export const getStatesForTypeProcedure = () => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/status/v1?idTypeRequest=0`,
    {
      method: "GET",
    }
  ).then((response) => {
    if (!response.errorCode) {
      return response.map((item) => {
        const reasons = item.reasons.map((reason) => ({
          ...reason,
          textContent: reason.name,
          value: reason.name,
        }));
        return {
          ...item,
          textContent: item.name,
          value: item.name,
          reasons,
        };
      });
    }
  });
};
