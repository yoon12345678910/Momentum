import { combineReducers } from 'redux';
import auth from './auth';
import background from './background';
import clock from './clock';
import greeting from './greeting';
import weather from './weather';
import todo from './todo';
import mainFocus from './mainFocus';
import { penderReducer } from 'redux-pender';

export default combineReducers({
  auth,
  background,
  clock,
  greeting,
  weather,
  todo,
  mainFocus,
  pender: penderReducer
});