export namespace ProcedureModel {
  export interface IProcedure {
    id: number;
    code: string;
    registerDate: string;
    requestType: IRequestType;
    statuses: IStatus[];
    comments: IComment[];
  }

  export interface IComment {
    id?: number;
    functionary:null | string;
    affiliate: null | string;
    comment: string;
    registerDate: string;
    file: string;
    fileName: string;
  }

  export interface IRequestType {
    id: number;
    name: string;
  }

  export interface IStatus {
    id: number;
    name: string;
    registerDate: string;
  }
}
