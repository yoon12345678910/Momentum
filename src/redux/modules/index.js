import { combineReducers } from 'redux';
import background from './background';
import clock from './clock';
import { penderReducer } from 'redux-pender';

export default combineReducers({
  background,
  clock,
  pender: penderReducer
});