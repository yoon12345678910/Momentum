import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

// action types
const TOGGLE_VISIBLE_WIDGETS = 'auto/TOGGLE_VISIBLE_WIDGET';

// action creator
export const toggleVisibleWidgets = createAction(TOGGLE_VISIBLE_WIDGETS);


// initial state
const initialState = Map({
  isVisibleWidgets: true
});

// reducer
export default handleActions({
  [TOGGLE_VISIBLE_WIDGETS]: (state) => {
    return state.set('isVisibleWidgets', !state.get('isVisibleWidgets'));
  },
}, initialState);
