export const formatCombo = (data) => {
  return data.map((item) => ({
    value: item[Object.keys(item)[0]],
    textContent: item[Object.keys(item)[1]],
    shortContent: item[Object.keys(item)[1]],
  }));
};

export const formatComboDocumentType = (data) =>
  data.map((item) => ({
    value: item[Object.keys(item)[1]],
    textContent: item[Object.keys(item)[2]],
    shortContent: item[Object.keys(item)[3]],
  }));

export const formatComboExecutiveList = (data) =>
  data.map((item) => ({
    value: item[Object.keys(item)[1]],
    textContent: `${item[Object.keys(item)[1]]} - ${
      item[Object.keys(item)[2]]
    } ${item[Object.keys(item)[3]]}`,
    shortContent: item[Object.keys(item)[1]],
  }));

export const formatComboCategories = (data) => {
  return data.map((item) => ({
    value: item[Object.keys(item)[0]],
    textContent: item[Object.keys(item)[1]],
    shortContent: item[Object.keys(item)[1]],
  }));
};
