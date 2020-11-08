import serviceFetcher from "modules/shared/libs/ServiceFetcher";

export const registerSimpleProcedure = async (request) => {
  let response = await serviceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/procedure/v1/generic/`,
    {
      method: "POST",
      body: request
    }
  ).catch((error) => console.log(error));
  let data = await response;
  return data;
};
