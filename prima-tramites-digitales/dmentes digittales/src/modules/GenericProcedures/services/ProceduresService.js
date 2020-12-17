// import { TOKEN } from "./env/token";
import { proceduresConfMock1 } from "./MockData/proceduresConfMock1";
import { proceduresConfMock2 } from "./MockData/proceduresConfMock2";

export class ProcedureService {
  URL_BACKEND = `${process.env.REACT_APP_APPLICANT_API}`;

  endpoint_login_applicant = `/auth/login`;
  endpoint_configuration = `/procedure/type/v1/`;
  endpoint_initial_data = `/procedure/v1/generic/`;
  endpoint_upload = `/document-manager/v1/upload`;
  endpoint_register_asessment = `/procedure/v1/generic/basic/`;

  async getConfiguration(idTypeRequest) {
    var myHeaders = new Headers();
    const TOKEN = sessionStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${TOKEN}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // http://10.105.9.152/bff-digital-procedures-transactional-web/procedure/type/v1/1/configuration/
    let response = await fetch(
      `${this.URL_BACKEND}${this.endpoint_configuration}${idTypeRequest}/configuration/`,
      requestOptions
    );
    let procedureConfiguration = await response.json();

    // mock service get configuration
    // let procedureConfiguration = null;
    // if (idTypeRequest === "1") {
    //   procedureConfiguration = proceduresConfMock1;
    // } else {
    //   procedureConfiguration = proceduresConfMock2;
    // }
    // mock service get configuration

    console.log(this.URL_BACKEND);
    console.log(procedureConfiguration);
    return procedureConfiguration;
  }

  async getProcedureInitialData(idProcedure) {
    var myHeaders = new Headers();
    const TOKEN = sessionStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${TOKEN}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // "http://10.105.9.152/bff-digital-procedures-transactional-web/procedure/v1/generic/1",
    let response = await fetch(
      `${this.URL_BACKEND}${this.endpoint_initial_data}${idProcedure}`,
      requestOptions
    );
    let result = await response.json();

    // console.log(response);
    console.log(result);
    return result;
  }

  async uploadDocument(file) {
    var myHeaders = new Headers();
    const TOKEN = sessionStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${TOKEN}`);

    var formdata = new FormData();
    formdata.append(
      "file",
      // documents,
      file,
      file.name
    );
    formdata.append("idRequest", "2");
    formdata.append("inTypeDocument", "R");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    // "http://10.105.9.152/bff-digital-procedures-transactional-web/document-manager/v1/upload",
    const response = await fetch(
      `${this.URL_BACKEND}${this.endpoint_upload}`,
      requestOptions
    );
    const result = await response.json();

    console.log(result);
    return result;
  }

  async registerAsessment(request) {
    var myHeaders = new Headers();
    const TOKEN = sessionStorage.getItem("token");
    myHeaders.append("Authorization", `Bearer ${TOKEN}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(request);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(
      `${this.URL_BACKEND}${this.endpoint_register_asessment}`,
      requestOptions
    );
    let result = await response.json();
    console.log(result);

    return result;
  }

  async registerProcedure(request) {
    // "POST"
  }
}
