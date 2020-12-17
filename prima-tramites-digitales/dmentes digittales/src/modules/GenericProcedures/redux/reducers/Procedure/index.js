const INITIAL_STATE = {
  id: 0,
  configuration: {
    idTypeRequest: 0,
    name: "",
    description: "",
    descriptionLarge: "",
    informationImportant: "",
    inBeneficiary: "",
    inComplexity: "",
    requirements: [],
    stages: [],
    documents: []
  },
  cellphone: "",
  comment: "",
  documents: [],
  documentsBeneficiary: [],
  request: {
    idTypeRequest: 0,
    comment: "",
    data: {
      idApplicant: "",
      date: "",
    },
  },
  idAsessment:{}
};


const Procedure = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ID_ASESSMENT":
      return { ...state, id: action.payload };
    case "SET_CELLPHONE":
      return { ...state, cellphone: action.payload };
    case "SET_REQUEST_DETAIL":
      return { ...state, comment: action.payload };
    case "SET_UPLOAD_FILE_BENEFICIARY":
      return { ...state, documentsBeneficiary: action.payload };
    case "SET_UPLOAD_FILE":
      return { ...state, documents:[...state.documents, action.payload] };
    default:
      return state;
  }
};

export default Procedure;
