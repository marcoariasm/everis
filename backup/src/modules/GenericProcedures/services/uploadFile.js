import serviceFetcher from "modules/shared/libs/ServiceFetcher";

export const uploadFile = async (file, idRequest) => {
  var formdata = new FormData();
  formdata.append(
    "file",
    file,
    file.name
  );
  formdata.append("idRequest", idRequest);
  formdata.append("inTypeDocument", "R");

  var requestOptions = {
    method: "POST",
    body: formdata,
  };

  // "http://10.105.9.152/bff-digital-procedures-transactional-web/document-manager/v1/upload",
  const response = await serviceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/document-manager/v1/upload`,
    requestOptions
  )
  .catch(error => console.log(error));
  const result = await response;
  return result;

};
