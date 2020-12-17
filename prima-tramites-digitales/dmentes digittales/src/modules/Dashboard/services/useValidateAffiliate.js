// import useSWR from "swr";
import ServiceFetcher from "modules/shared/libs/ServiceFetcher";

export const validateAffiliate = (birth, document) => {

  var raw = ({
    documentType: "00",
    documentNumber: document,
    birthdate: birth,
  });

  return ServiceFetcher(
    `${process.env.REACT_APP_APPLICANT_API}affiliate/v1/validate`,
    {
      method: "POST",
      body: raw,
    }
  )
    .then((response) => console.log(response))
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
