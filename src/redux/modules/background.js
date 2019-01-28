import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { getRandomImage } from 'lib/api/background';


// action types
const CHANGE_IMAGE = 'background/CHANGE_IMAGE';
const LOADED_IMAGE = 'background/LOADED_IMAGE';

// action creator
export const changeImage = createAction(CHANGE_IMAGE);
export const loadedImage = createAction(LOADED_IMAGE);

// initial state
const initialState = Map({
  loaded: false,
  currentImage: Map({})
});

// reducer
export default handleActions({
  [CHANGE_IMAGE]: (state) => {
    const image = getRandomImage(state.get('currentImage').toJS().id);
    return state.set('currentImage', Map(image))
                .set('loaded', false);
  },
  [LOADED_IMAGE]: (state) => {
    return state.set('loaded', true);
  }
}, initialState);
