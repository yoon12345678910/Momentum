import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { getRandomImage } from 'lib/api/background';

// action types
const GET_IMAGE = 'background/GET_IMAGE';
const LOADED_IMAGE = 'background/LOADED_IMAGE';

// action creator
export const getImage = createAction(GET_IMAGE);
export const loadedImage = createAction(LOADED_IMAGE);

// initial state
const initialState = Map({
  loaded: false,
  currentImage: Map({})
});

// reducer
export default handleActions({
  [GET_IMAGE]: (state) => {
    return state.set('currentImage', Map(getRandomImage()))
                .set('loaded', false);
  },
  [LOADED_IMAGE]: (state) => {
    return state.set('loaded', true);
  }
}, initialState);
