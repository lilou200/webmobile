import { message } from "antd";

export const renderBoolean = (value) => {
  return value ? <>Yes</> : <>No</>;
};

export const VALIDATION_RULES = {
  requiredNonBlankString: [{ required: true }, { whitespace: true },{
    pattern: /^[\p{L}\s'-]+$/u,
    message: "Seules les lettres sont autorisées",
  }],
  //requiredNumber: [{ required: true }, { pattern: "[1-9]+", message: "Please enter a valid number" }],
  optionalNonBlankString: [{ required: false }, { whitespace: true }],
  requiredEmail: [{ required: true, type: "email" }],
  requiredPassword: [{ required: true }, { min: 8 }],
  requiredPhoneNumber: [{ required: true }, { pattern: "^04[0-9]{8}$", message: "le numéro doit commencer par 04 et contenir 8 chiffres" }],  
};

/**
 * converts a date value into dayjs object
 * @param {*} values
 * @returns
 */
export const getValues = (values) => {
  if (values?.date) {
    values.date = dayjs(values.date);
  }

  return values;
};
