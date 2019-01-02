import { combineReducers } from 'redux';
import background from './background';
import clock from './clock';
import greeting from './greeting';
import { penderReducer } from 'redux-pender';

export default combineReducers({
  background,
  clock,
  greeting,
  pender: penderReducer
});