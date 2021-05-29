export namespace ProcedureModel {
  export interface Procedure {
    id: number;
    commentInternal: string | null;
    requestTypeId: number;
    requestType: string;
    statusId: number;
    status: string;
    registerDate: string;
    affiliate: Affiliate;
    petitioner: Petitioner;
    statuses: Status[];
    beneficiaries: any[];
    executiveId: number;
    comments: Comment[];
    requirementsRequest: Requirements[];
    requirementsBeneficiary: Requirements[];
  }

  export interface Affiliate {
    cuspp: string;
    fullname: string;
    firstName: string;
    secondName: string;
    fatherLastname: string;
    motherLastname: string;
    documentTypeId: number;
    documentType: string;
    documentNumber: string;
    email: string;
    cellphone: string;
    telephone: string;
    genre: string;
    maritalStatusId: null;
    maritalStatus: null;
    birthdate: string;
  }

  export interface Comment {
    comment: string;
    file: null | string;
    functionary: null | string;
    affiliate: null | string;
    registerDate: string;
    fileName: string;
  }

  export interface Petitioner {
    fullname: string;
    firstName: string;
    secondName: string;
    fatherLastname: string;
    motherLastname: string;
    documentTypeId: number;
    documentType: string;
    documentNumber: string;
    birthdate: string;
    relationshipTypeId: number;
    relationshipType: string;
    email: string;
    cellphone: string;
    telephone: string;
  }

  export interface Requirements {
    file: string;
    registerDate: string;
  }

  export interface Status {
    id: number;
    name: string;
    reason: string;
    registerDate: string;
  }
}
