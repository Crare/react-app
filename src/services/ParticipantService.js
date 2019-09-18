import Utils from './Utils';

const ParticipantService = {

  /**
   * Gets n amount of participants
   * @param {number} amount 
   * @returns list of Participant objects.
   */
  getParticipantList(amount) {
    return Utils.generateParticipants(amount);
  }

  // getParticipant
  // updateParticipant
  //
  
}

export default ParticipantService;
