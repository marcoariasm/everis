const INITIAL_STATE = {
  id: 0,
  cellphone: "",
  comment: "",
  beneficiaryStatement: null,
  documents: [],
  documentsBeneficiary: [],
  email: "",
  asessment: "",
  procedure: "",
  persons: {
    idAffiliate: null,
    idApplicant: null,
    idRepresentative: null,
    idTypeTask: 0,
    idTypeRequest: 0
  }
};

const Procedure = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_BENEFICIARY_STATEMENT":
      return { ...state, beneficiaryStatement: action.payload };
    case "SET_PERSONS":
      return { ...state, persons: action.payload };
    case "SET_CODE_ASESSMENT":
      return { ...state, asessment: action.payload };
    case "SET_CODE_PROCEDURE":
      return { ...state, procedure: action.payload };
    case "SET_ID_ASESSMENT":
      return { ...state, id: action.payload };
    case "SET_CELLPHONE":
      return { ...state, cellphone: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_REQUEST_DETAIL":
      return { ...state, comment: action.payload };
    case "SET_UPLOAD_FILE_BENEFICIARY":
      return {
        ...state,
        documentsBeneficiary: [...state.documentsBeneficiary, action.payload],
      };
    case "SET_UPLOAD_FILE":
      return { ...state, documents: [...state.documents, action.payload] };
    default:
      return state;
  }
};

export default Procedure;
