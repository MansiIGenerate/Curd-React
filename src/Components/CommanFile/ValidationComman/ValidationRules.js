import { ValidatorForm } from "react-material-ui-form-validator";

ValidatorForm.addValidationRule("namevalidationsrule", (value) => {
  return /^[a-zA-Z\s]*$/.test(value);
});

ValidatorForm.addValidationRule("emailvalidationsrule", (value) => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
});
