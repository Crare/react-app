import { ActionTypes } from './types';

import ParticipantService from '../services/ParticipantService';
import Participant from '../dto/Participant';

const participantService = new ParticipantService();

export const participantFormUpdate = ({ prop, value }) => {
  return {
    type: ActionTypes.PARTICIPANT_FORM_UPDATE,
    payload: { prop, value }
  };
};


export const fetchParticipants = ({ filter }) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.PARTICIPANTS_FETCHING });

    participantService.fetchParticipants(filter, (participants) => {
      dispatch({ type: ActionTypes.PARTICIPANTS_FETCH_SUCCESS, payload: participants });
    });
  };
};


export const addNewParticipant = ({ name, email, phone }) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.PARTICIPANT_SAVING });
    participantService.addNewParticipant(new Participant(null, name, email, phone), (response) => {
      if (!response.error && response.participants) {
        dispatch({ type: ActionTypes.PARTICIPANT_SAVE_SUCCESS, payload: response.participants });
      } else {
        dispatch({ type: ActionTypes.PARTICIPANT_SAVE_FAIL, payload: response.error });
      }
    }, (errors) => {
      dispatch({ type: ActionTypes.PARTICIPANT_SAVE_VALIDATION_ERROR, payload: errors });
    });
  }
};

export const deleteParticipant = ({ participantId }) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.PARTICIPANT_DELETING });
    participantService.deleteParticipant(participantId, (response) => {
      if (response.participants) {
        dispatch({ type: ActionTypes.PARTICIPANT_DELETE_SUCCESS, payload: response.participants });
      } else if (response.error) {
        dispatch({ type: ActionTypes.PARTICIPANT_DELETE_FAIL, payload: response.error });
      }
    });
  }
}
