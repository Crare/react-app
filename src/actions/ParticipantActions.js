import { ActionTypes } from './types';

import ParticipantService from '../services/ParticipantService';
import Participant from '../dto/Participant';

const participantService = new ParticipantService();

export const generateParticipants = (amount) => {

  return (dispatch) => {
    dispatch({ type: ActionTypes.PARTICIPANTS_GENERATING });

    participantService.generateParticipants(amount, (participants) => {
      dispatch({ type: ActionTypes.PARTICIPANTS_GENERATE_SUCCESS, payload: participants });
    });
  };
};

export const addNewParticipant = ({ name, email, phone }) => {

  return (dispatch) => {
    dispatch({ type: ActionTypes.PARTICIPANT_SAVING });

    participantService.addNewParticipant(new Participant(null, name, email, phone), (response) => {
      if (response === "success") {
        dispatch({ type: ActionTypes.PARTICIPANT_SAVE_SUCCESS });
      } else {
        dispatch({ type: ActionTypes.PARTICIPANT_SAVE_FAIL, payload: response.error });
      }
    }).catch((error) => {
      console.error(error);
    });
  }

};
