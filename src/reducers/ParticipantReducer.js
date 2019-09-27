import { ActionTypes } from '../actions/types';

const INITIAL_STATE = {
  participants: [],
  form: { name: '', email: '', phone: '' },
  loading: false,
  errors: [],
};

export default (state = INITIAL_STATE, action) => {
  // console.log("action: ", action);
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

    case ActionTypes.PARTICIPANT_FORM_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' } 
      return { ...state, form: { ...state.form, [action.payload.prop]: action.payload.value } };

    default:
      return state;
  }
};