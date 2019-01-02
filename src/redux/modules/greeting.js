import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { getRandomMantra } from 'lib/api/greeting';

// action types
const CHNAGE_MODE = 'greeting/CHNAGE_MODE';
const SET_LOADED_MODE = 'greeting/SET_LOADED_MODE';
const SET_GREETING = 'greeting/SET_GREETING';
const SET_MANTRA = 'greeting/SET_MANTRA';
const SET_INPUT_DISABLED = 'greeting/SET_INPUT_DISABLED';
const SET_USERNAME = 'greeting/SET_USERNAME';

// action creator
export const setLoadedMode = createAction(SET_LOADED_MODE);
export const changeMode = createAction(CHNAGE_MODE);
export const setGreeting = createAction(SET_GREETING);
export const setMantra = createAction(SET_MANTRA);
export const setInputDisabled = createAction(SET_INPUT_DISABLED);
export const setUserName = createAction(SET_USERNAME);

// initial state
const initialState = Map({
  mode: 'INIT',
  isChangedMode: false,
  isDisabledInput: true,
  isUserNameHidden: true,
  greeting: '',
  mantra: '',
  userName: ''
});

// reducer
export default handleActions({
  [SET_LOADED_MODE]: (state) => {
    return state.set('isChangedMode', false);
  },
  [CHNAGE_MODE]: (state, action) => {
    return state.set('mode', action.payload.mode)
                .set('isChangedMode', true)
                .set('isUserNameHidden', true)
                .set('mantra', '');
  },
  [SET_GREETING]: (state, action) => {
    const { greeting } = action.payload;
    return state.set('greeting', greeting)
                .set('isUserNameHidden', false);
  },
  [SET_MANTRA]: (state) => {
    const { mantra, isUserNameHidden } = getRandomMantra();
    return state.set('mantra', `${mantra}${isUserNameHidden ? '.' : ','} `)
                .set('isUserNameHidden', isUserNameHidden);
  },
  [SET_INPUT_DISABLED]: (state, action) => {
    const { isDisabledInput } = action.payload;
    return state.set('isDisabledInput', isDisabledInput);
  },
  [SET_USERNAME]: (state, action) => {
    const { userName } = action.payload;
    return state.set('userName', userName);
  }
}, initialState);
