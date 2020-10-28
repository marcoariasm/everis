import { URL_BACKEND } from './env/urls';
import { procedures } from './MockData/procedures';

export class ProcedureService {

    endpoint = `bff-digital-procedures-transactional-web/procedure/type/v1/1/configuration/`;

    async getProcedure(idTypeRequest) {
        // let response = await fetch(`${URL_BACKEND}${this.endpoint}${idTypeRequest}`);
        // let oneProcedure = await response.json();
        // console.log(procedures.filter( procedure => procedure.typeRequestId===idTypeRequest));
        let oneProcedure = procedures.filter( procedure => procedure.typeRequestId===idTypeRequest);

        return oneProcedure;
    }

    async getAllProcedures() {
        let response = await fetch(`${URL_BACKEND}${this.endpoint}`);
        let procedures = await response.json();
        console.log(procedures);
        let listProcedures = procedures;

        return listProcedures;
    }

    async registerProcedures(idTypeRequest) {
        let response = await fetch(`${URL_BACKEND}${this.endpoint}`, {
            method: 'POST',
            // body: JSON.stringify(idTypeRequest),
            body: idTypeRequest,
            headers: {
                "Content-type": "application/json"
            }
        });
        response = await response.text();
        return response;
    }

}