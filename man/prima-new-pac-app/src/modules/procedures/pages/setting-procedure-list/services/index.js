import ServiceFetcher from "modules/shared/libs/ServiceFetcher";

import AppSession from "modules/shared/libs/AppSession";

const getSessionFromProvider = () => AppSession.getUser();

const sessionUser = getSessionFromProvider();

export const disabledProcedure = async (id) => {
  try {
    const bearer = "Bearer " + sessionUser.accessToken;
    const options = {
      headers: { "Content-Type": "application/json", Authorization: bearer },
      method: "PUT",
    };
    const api = `${process.env.REACT_APP_API_PROCEDURES}/procedure/type/v1/inactive/${id}`;
    const register = await fetch(api, options);
    const response = await register.json();
    return response;
  } catch {
    console.trace("error");
    return "error";
  }
};
