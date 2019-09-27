/**
 * Handles validations.
 * 
 * Could be replaced probably with some node module.
 *
 * @class Validator
 * 
 * @method validateFields
 * @method validate
 * 
 * @method validateName
 * @method validateEmail
 * @method validatePhone
 * 
 */
class Validator {

  /**
   * Validates array of fields/form as array
   * type is type of InputValidationType
   * @param {*} fields [ {value: "foo", type: "bar" }, ...]
   * 
   * @returns errors array: [{key: ..., text: 'lorem ipsum'}, ...]
   */
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

  /**
   * validates one value of type x.
   * @param {*} value value to check to match validation
   * @param {*} type type of InputValidationType
   */
  validate(value, type) {
    switch (type) {
      case InputValidationType.NAME:
        return this.validateName(value);
      case InputValidationType.EMAIL:
        return this.validateEmail(value);
      case InputValidationType.PHONE:
        return this.validatePhone(value);
      default:
        return { error: { key: ERROR.UNHANDLED_ERROR, text: "unhandled InputValidationType!" } };
    }
  }

  validateName(value) {
    // simplyfied version.
    // should really use better matcher for unicode characters from other languages.
    // do we want to have space in between? do we want to allow multiple words than 2?
    if (value.match(/^[A-ö]+\s[A-ö]+$/)) {
      return { success: true };
    }
    return { error: { key: ERROR.INVALID_NAME, text: "Invalid name, please give firstname and lastname separated with space." } }
  }

  validateEmail(value) {
    // simplified email regexp, 
    // we could use example from https://emailregex.com/ too:
    // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (value.match(/^\w+\.*\w*@\w+\.\w+\.?\w+$/)) {
      return { success: true };
    }
    return { error: { key: ERROR.INVALID_EMAIL, text: "Invalid email address." } }
  }

  validatePhone(value) {
    // validates to contain only numbers
    // removes spaces when checking for only numbers
    if (value.toString().split(' ').join('').match(/^\d{3,16}$/)) {
      return { success: true };
    }
    return { error: { key: ERROR.INVALID_PHONE, text: "Invalid phone number. Only add numbers and spaces." } }
  }

}

const InputValidationType = {
  NAME: "NAME",
  EMAIL: "EMAIL",
  PHONE: "PHONE"
}

const ERROR = {
  UNHANDLED_ERROR: "UNHANDLED_ERROR",
  INVALID_NAME: "INVALID_NAME",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_PHONE: "INVALID_PHONE",
}


export { Validator, InputValidationType };