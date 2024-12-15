const FormValidator = ({ formData = {}, excludedFields = [] }) => {
  const emptyFields = Object.entries(formData)
    .filter(
      ([key, value]) =>
        !excludedFields.includes(key) &&
        (value === null || value === undefined || value === "")
    )
    .map(([key]) => key);

  return emptyFields;
};

export default FormValidator;
