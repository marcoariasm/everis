import serviceFetcher from "modules/shared/libs/ServiceFetcher";

export const registerSimpleProcedure = async (request) => {
  let body = request
  let response = await serviceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/generic/`,
    {
      method: "POST",
      body: body
    }
  ).catch(error => {return error});
  let data = await response;
  if ( data!= undefined)
    return data;
  else
    return "error";
};
