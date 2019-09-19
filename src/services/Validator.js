/**
 * Handles validations.
 *
 * @class Validator
 * 
 * @method validateFields
 * @method validate
 * @method validateName
 * @method validateEmail
 * @method validatePhone
 */
class Validator {

  validateFields(fields) {
    let errors = [];
    fields.forEach(field => {
      const validation = this.validate(field.value, field.type);
      if (validation.error) {
        errors.push(validation.error);
      }
    });
    return errors;
  }

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
  }

  validateName(value) {
    if (value.match(/^\w+\s\w+$/)) {
      return { success: true };
    }
    console.log("validateName value.match()", value.match(/^\w+\s\w+$/));
    return { error: "Invalid name, please give firstname and lastname." }
  }

  validateEmail(value) {
    if (value.match(/^[\w.]+@[\w.]+$/)) {
      return { success: true };
    }
    return { error: "Invalid email address." }
  }

  validatePhone(value) {
    if (value.match(/^[\d ]+$/)) {
      return { success: true };
    }
    return { error: "Invalid phone number. Only add numbers and spaces." }
  }

}

const InputValidationType = {
  NAME: "NAME",
  EMAIL: "EMAIL",
  PHONE: "PHONE"
}


export { Validator, InputValidationType };