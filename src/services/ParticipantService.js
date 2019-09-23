import Utils from './Utils';
import { Validator, InputValidationType } from './Validator';

/**
 * Service for handling participants with backend.
 * @method getParticipantList
 * @method generateParticipants
 * @method addNewParticipant
 * @method updateParticipant TODO:
 * @method deleteParticipant TODO:
 */
class ParticipantService {

  constructor() {
    this.utils = new Utils();
    this.validator = new Validator();
  }
  /**
   * Gets  participants
   * @returns callback with list of Participant-objects.
   */
  getParticipantList(callback) {
    callback(this.utils.getParticipants());
  }

  /**
   * 
   * Generates n amount of participants
   * @param {number} amount 
   * @returns callback with list of Participant-objects.
   */
  generateParticipants(amount, callback) {
    callback(this.utils.generateParticipants(amount));
  }

  /**
   * Adds new participant to the database
   * Validates before saving
   * @param {*} participant type of Participant class.
   * @param {*} callback return "success" -string on successful entry.
   * @param {*} validationError returns array of validation errors.
   */
  addNewParticipant(participant, callback, validationError) {
    const fields = [
      { value: participant.name, type: InputValidationType.NAME },
      { value: participant.email, type: InputValidationType.EMAIL },
      { value: participant.phone, type: InputValidationType.PHONE }
    ];
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

  // TODO: updateParticipant(participant, callback) {}

}

export default ParticipantService;
