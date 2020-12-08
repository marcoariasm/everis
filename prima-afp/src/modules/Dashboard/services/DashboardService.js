// import { TOKEN } from "../../GenericProcedures/services/env/token";

export class DashboardService {
  URL_BACKEND = `${process.env.REACT_APP_APPLICANT_API}`;

  endpoint_login_applicant = `/auth/login`;
  endpoint_list_categories = `/procedure/type/v1/category`;
  endpoint_validate = `/affiliate/v1/validate`;
  endpoint_documentsType = `/excluded/document/v1`;


  // getTokenFromSessionStorage = () =>{
  //   const token = sessionStorage.getItem("token");
  //   return token;
  // }

  async loginApplicant() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      documentType: 1,
      documentNumber: "40614447",
      password: "123456",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(
      `${this.URL_BACKEND}${this.endpoint_login_applicant}`,
      requestOptions
    );
    let result = await response.json();
    sessionStorage.setItem("token", result.accessToken)
    return result.accessToken;
  }

  async getListCategories() {
    var myHeaders = new Headers();
    const user = JSON.parse(sessionStorage.getItem("user"));
    myHeaders.append("Authorization", `Bearer ${user.accessToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let response = await fetch(
      `${this.URL_BACKEND}${this.endpoint_list_categories}`,
      requestOptions
    );
    let result = await response.json();
    return result;
  }


  async validateAffiliate(payload) {
    var myHeaders = new Headers();
    const user = JSON.parse(sessionStorage.getItem("user"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.accessToken}`);

    var raw = JSON.stringify(payload);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(
      `${this.URL_BACKEND}${this.endpoint_validate}`,
      requestOptions
    );
    let result = await response.json();

    return result;
  }

}
