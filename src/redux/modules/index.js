import { combineReducers } from 'redux';
import background from './background';
import clock from './clock';

export default combineReducers({
  background,
  clock
});