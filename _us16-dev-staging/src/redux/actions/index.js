export const setDjNoBeneficiary = (payload) => ({
  type: 'SET_DJ_NO_BENEFICIARY',
  payload,
})

export const setViewVideo = (payload) => ({
  type: 'SET_VIEW_VIDEO',
  payload,
})
export const setDjPensioner = (payload) => ({
  type: 'SET_PENSIONER',
  payload,
})

export const setDataBeneficery = (payload) => ({
  type: 'SET_DATA_NEW_BENEFICERY',
  payload
})

//Ui action
export const setUILoading = (payload) => ({
  type: 'UI_SET_LOADING',
  payload,
});
export const setUIMessage = (payload) => ({
  type: 'UI_SET_MESSAGE',
  payload,
});

