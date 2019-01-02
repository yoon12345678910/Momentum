import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

// action types
const SET_TIME = 'clock/SET_TIME';

// action creator
export const setTime = createAction(SET_TIME);

// initial state
const initialState = Map({
  hour12clock: true,
  meridiem: '',
  currentTime: ''
});

// reducer
export default handleActions({
  [SET_TIME]: (state, action) => {
    const { hour12clock, meridiem, currentTime } = action.payload;
    return state.set('hour12clock', hour12clock)
                .set('meridiem', meridiem)
                .set('currentTime', currentTime);
  }
}, initialState);
