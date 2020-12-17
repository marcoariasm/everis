import ServiceFetcher from "modules/shared/libs/ServiceFetcher";

export const getListCategories = () => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/procedure/type/v1/category/`,
    {
      method: "GET",
    }
  );
};

export const getProcedure = (id) => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/procedure/type/v1/${id}/configuration/`,
    {
      methdo: "GET",
    }
  );
};

export const updateProcedure = (id, data) => {
  if (data) {
    return JSON.parse('{id:1,value:"type"},{id:2,value:"type2"}');
  } else {
  }
};

export const getListStatus = () => {
  return ServiceFetcher(
    `${process.env.REACT_APP_API_PROCEDURES}/procedure/type/v1/status`,
    {
      methdo: "GET",
    }
  );
};
