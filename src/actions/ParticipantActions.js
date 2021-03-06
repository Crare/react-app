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
    participantService.fetchParticipants(filter, (response) => {
      if (response.participants) {
        dispatch({ type: ActionTypes.PARTICIPANTS_FETCH_SUCCESS, payload: response.participants });
      } else {
        dispatch({ type: ActionTypes.PARTICIPANTS_FETCH_FAIL, payload: response.errors });
      }
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

export const updateParticipant = ({ participant }) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.PARTICIPANT_UPDATE_SAVING, payload: participant });

    setTimeout(() => { // timeout because mapStateToProps() won't get called otherwise and next dispatch will override it.
      participantService.updateParticipant(participant, (response) => {
        if (response.participants) {
          dispatch({ type: ActionTypes.PARTICIPANT_UPDATE_SUCCESS, payload: response.participants });
        } else if (response.error) {
          dispatch({ type: ActionTypes.PARTICIPANT_UPDATE_FAIL, payload: response.error });
        }
      }, (errors) => {
        dispatch({ type: ActionTypes.PARTICIPANT_UPDATE_VALIDATION_ERROR, payload: errors });
      });
    }, 100)

  }
}

export const participantEmptyErrors = () => {
  return { type: ActionTypes.PARTICIPANT_ERROR_EMPTY };
}