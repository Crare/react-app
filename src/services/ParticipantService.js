import Utils from './Utils';

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
   * @param {*} participant type of Participant class.
   * @param {*} callback return "success" -string on succesfull entry.
   */
  addNewParticipant(participant, callback) {
    callback(this.utils.addNewParticipant(participant));
  }

  // TODO: updateParticipant(participant, callback) {}
  // TODO: deleteParticipant(participant, callback) {}

}

export default ParticipantService;
