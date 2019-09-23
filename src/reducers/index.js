import { combineReducers } from 'redux';
import ParticipantReducer from './ParticipantReducer';

export default combineReducers({
  participantReducer: ParticipantReducer
});
