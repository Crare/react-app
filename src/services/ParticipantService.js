import Utils from './Utils';
import { Validator, InputValidationType } from './Validator';

/**
 * Service for handling participants with backend.
 * @method getParticipantList
 * @method generateParticipants
 * @method addNewParticipant
 * @method deleteParticipant
 * @method updateParticipant
 */
class ParticipantService {

  constructor() {
    this.utils = new Utils();
    this.validator = new Validator();
  }
  /**
   * Fetches participants
   * @returns callback with list of Participant-objects.
   */
  fetchParticipants(filter, callback) {
    callback(this.utils.getParticipants(filter));
  }

  getFormFields(participant) {
    participant.name = participant.name.trim();
    participant.email = participant.email.trim();
    participant.phone = participant.phone.trim();
    const fields = [
      { value: participant.name, type: InputValidationType.NAME },
      { value: participant.email, type: InputValidationType.EMAIL },
      { value: participant.phone, type: InputValidationType.PHONE }
    ];
    return fields;
  }

  /**
   * Adds new participant to the database
   * Validates before saving
   * @param {*} participant type of Participant class.
   * @param {*} callback return "success" -string on successful entry.
   * @param {*} validationError returns array of validation errors.
   */
  addNewParticipant(participant, callback, validationError) {
    const fields = this.getFormFields(participant);
    const errors = this.validator.validateFields(fields);
    if (errors.length > 0) {
      validationError(errors);
    } else {
      callback(this.utils.addNewParticipant(participant));
    }
  }

  deleteParticipant(participantId, callback) {
    callback(this.utils.deleteParticipant(participantId));
  }

  updateParticipant(participant, callback, validationError) {
    const fields = this.getFormFields(participant);
    const errors = this.validator.validateFields(fields);
    if (errors.length > 0) {
      validationError(errors);
    } else {
      callback(this.utils.updateParticipant(participant));
    }
  }

}

export default ParticipantService;
