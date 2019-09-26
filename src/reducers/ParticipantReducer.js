import { ActionTypes } from '../actions/types';

const INITIAL_STATE = {
  participants: [],
  form: { name: '', email: '', phone: '' },
  loading: false,
  errors: [],
};

export default (state = INITIAL_STATE, action) => {
  console.log("action.type: ", action.type);
  switch (action.type) {

    case ActionTypes.PARTICIPANTS_FETCH_SUCCESS:
      return { ...state, loading: false, errors: [], participants: action.payload };

    case ActionTypes.PARTICIPANT_SAVE_SUCCESS:
      return { ...state, loading: false, errors: [], form: INITIAL_STATE.form, participants: action.payload };

    case ActionTypes.PARTICIPANT_SAVING:
    case ActionTypes.PARTICIPANTS_FETCHING:
      return { ...state, loading: true, errors: [] };

    case ActionTypes.PARTICIPANT_SAVE_FAIL:
      return { ...state, loading: false, form: INITIAL_STATE.form, errors: action.payload };

    case ActionTypes.PARTICIPANT_SAVE_VALIDATION_ERROR:
      return { ...state, loading: false, errors: action.payload };

    default:
      return state;
  }
};