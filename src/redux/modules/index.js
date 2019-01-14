import { combineReducers } from 'redux';
import auth from './auth';
import background from './background';
import clock from './clock';
import greeting from './greeting';
import weather from './weather';
import { penderReducer } from 'redux-pender';

export default combineReducers({
  auth,
  background,
  clock,
  greeting,
  weather,
  pender: penderReducer
});