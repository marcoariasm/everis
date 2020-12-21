import serviceFetcher from "modules/shared/libs/ServiceFetcher";

const defaultError = {
    error: 'Hubo un problema al borrar el archivo',
    advice: 'Intente borrar el documento nuevamente'
};


export const inactivateFile = async (idRequestDocument) => {
  var body = "";
  
  var requestOptions = {
    method: "PUT",
    body
  };

// http://10.105.9.152/bff-digital-procedures-transactional-web/document-manager/v1/inactivate/74
  const response = await serviceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}/document-manager/v1/inactivate/${idRequestDocument}`,
    requestOptions
  )
  .catch(error => {
    console.log(error)
    return defaultError;
  });
  const result = await response;
  if ( result!= undefined)
    return result;
  else
    return "error";
};
