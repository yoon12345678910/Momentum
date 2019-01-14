import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

// action types
const SET_IMAGE = 'background/SET_IMAGE';
const LOADED_IMAGE = 'background/LOADED_IMAGE';

// action creator
export const setImage = createAction(SET_IMAGE);
export const loadedImage = createAction(LOADED_IMAGE);

// initial state
const initialState = Map({
  loaded: false,
  currentImage: Map({})
});

// reducer
export default handleActions({
  [SET_IMAGE]: (state, action) => {
    return state.set('currentImage', Map(action.payload.currentImage))
                .set('loaded', false);
  },
  [LOADED_IMAGE]: (state) => {
    return state.set('loaded', true);
  }
}, initialState);
