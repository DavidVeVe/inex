export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};

export const updateObject = (state, updatedProps) => {
  return {
    ...state,
    ...updatedProps,
  };
};

export const clearForm = (form, updateObject) => {
  let newForm = {};

  for (let key in form) {
    newForm[key] = updateObject(form[key], { value: "" });
  }

  return newForm;
};

export const getFormData = (data) => {
  let updatedForm = {};

  for (let key in data) {
    updatedForm[key] = data[key].value;
  }

  return updatedForm;
};
