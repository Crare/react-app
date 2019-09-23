import { ActionTypes } from '../actions/types';

const INITIAL_STATE = {
  participants: [],
  form: { name: '', email: '', phone: '' },
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionTypes.PARTICIPANTS_GENERATE_SUCCESS:
      return { ...state, loading: false, participants: action.payload };

    case ActionTypes.PARTICIPANT_SAVE_SUCCESS:
      return { ...state, loading: false, form: action.payload };

    case ActionTypes.PARTICIPANTS_GENERATING:
    case ActionTypes.PARTICIPANT_SAVING:
      return { ...state, loading: true };

    case ActionTypes.PARTICIPANTS_GENERATE_ERROR:
      return INITIAL_STATE;

    case ActionTypes.PARTICIPANT_SAVE_FAIL:
      return { ...state, loading: false, form: INITIAL_STATE.form, error: action.payload };


    default:
      return state;
  }
};