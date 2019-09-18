const Validator = {

  validateFields(fields) {
    let errors = [];
    fields.forEach(field => {
      const validation = this.validate(field.value, field.type);
      if (validation.error) {
        errors.push(validation.error);
      }
    });
    return errors;
  },

  validate(value, type) {
    switch (type) {
      case InputValidationType.NAME:
        return this.validateName(value);
      case InputValidationType.EMAIL:
        return this.validateEmail(value);
      case InputValidationType.PHONE:
        return this.validatePhone(value);
      default:
        return { error: "unhandled InputValidationType!" };
    }
  },

  validateName(value) {
    if (!value.match(/^\w+ \w+$/)) {
      return { error: "Invalid name, please give firstname and lastname." }
    }
    return { success: true };
  },

  validateEmail(value) {
    if (!value.match(/^[\w.]+@[\w.]+$/)) {
      return { error: "Invalid email address." }
    }
    return { success: true };
  },

  validatePhone(value) {
    if (!value.match(/^[\d ]+$/)) {
      return { error: "Invalid phone number. Only add numbers and spaces." }
    }
    return { success: true };
  },

}

const InputValidationType = {
  NAME: "NAME",
  EMAIL: "EMAIL",
  PHONE: "PHONE"
}


export { Validator, InputValidationType };