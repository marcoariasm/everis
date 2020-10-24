import { URL_BACKEND } from './env/urls';
import { procedures } from './MockData/procedures';

export class ProcedureService {

    endpoint = `/procedures/v1/list/`;

    async getProcedure(idTypeRequest) {
        // let response = await fetch(`${URL_BACKEND}${this.endpoint}${idTypeRequest}`);
        // let oneProcedure = await response.json();
        let oneProcedure = procedures[idTypeRequest-1];

        return oneProcedure;
    }

    async getAllProcedures() {
        // let response = await fetch(`${URL_BACKEND}${this.endpoint}`);
        // let procedures = await response.json();
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