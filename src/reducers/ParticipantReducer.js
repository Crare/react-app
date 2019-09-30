import { ActionTypes } from '../actions/types';

const INITIAL_STATE = {
  participants: [],
  form: { name: '', email: '', phone: '' },
  loading: false,
  errors: [],
  editParticipant: null
};

export default (state = INITIAL_STATE, action) => {
  // console.log("action.type:", action.type, "\naction.payload:", action.payload);
  switch (action.type) {

    case ActionTypes.PARTICIPANTS_FETCH_SUCCESS:
    case ActionTypes.PARTICIPANTS_SORT:
    case ActionTypes.PARTICIPANT_DELETE_SUCCESS:
      return { ...state, loading: false, errors: [], participants: action.payload };

    case ActionTypes.PARTICIPANT_SAVE_SUCCESS:
    case ActionTypes.PARTICIPANT_UPDATE_SUCCESS:
      return { ...state, loading: false, errors: [], form: INITIAL_STATE.form, participants: action.payload, editParticipant: null };

    case ActionTypes.PARTICIPANT_SAVING:
    case ActionTypes.PARTICIPANTS_FETCHING:
    case ActionTypes.PARTICIPANT_DELETING:
      return { ...state, loading: true, errors: [] };

    case ActionTypes.PARTICIPANT_UPDATE_SAVING:
      return { ...state, loading: true, errors: [], editParticipant: action.payload };

    case ActionTypes.PARTICIPANT_SAVE_FAIL:
      return { ...state, loading: false, form: INITIAL_STATE.form, errors: action.payload };

    case ActionTypes.PARTICIPANT_SAVE_VALIDATION_ERROR:
    case ActionTypes.PARTICIPANT_UPDATE_VALIDATION_ERROR:
      return { ...state, loading: false, errors: action.payload };

    case ActionTypes.PARTICIPANT_FORM_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' } 
      return { ...state, form: { ...state.form, [action.payload.prop]: action.payload.value } };

    case ActionTypes.PARTICIPANT_DELETE_FAIL:
    case ActionTypes.PARTICIPANT_UPDATE_FAIL:
      return { ...state, loading: false, errors: [action.payload] };

    case ActionTypes.PARTICIPANT_ERROR_EMPTY:
      return { ...state, errors: INITIAL_STATE.errors };

    default:
      // console.log("unhandled action.type: ", action.type);
      return state;
  }
};