import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { getRandomMantra } from 'lib/api/greeting';

// action types
const CHNAGE_MODE = 'greeting/CHNAGE_MODE';
const SET_LOADED_MODE = 'greeting/SET_LOADED_MODE';
const SET_GREETING = 'greeting/SET_GREETING';
const SET_MANTRA = 'greeting/SET_MANTRA';
const SET_USERNAME = 'greeting/SET_USERNAME';
const FOCUSE_USERNAME = 'greeting/FOCUSE_USERNAME';
const BLUR_USERNAME = 'greeting/BLUR_USERNAME';
const TOGGLE_DROPDOWN = 'greeting/TOGGLE_DROPDOWN';

// action creator
export const setLoadedMode = createAction(SET_LOADED_MODE);
export const changeMode = createAction(CHNAGE_MODE);
export const setGreeting = createAction(SET_GREETING);
export const setMantra = createAction(SET_MANTRA);
export const focuseUserName = createAction(FOCUSE_USERNAME);
export const blurUserName = createAction(BLUR_USERNAME);
export const setUserName = createAction(SET_USERNAME);
export const toggleDropdown = createAction(TOGGLE_DROPDOWN);

// initial state
const initialState = Map({
  mode: 'INIT',
  isChangedMode: false,
  isFocusedUserName: false,
  isHiddenUserName: true,
  isActiveDropdown: false,
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
                .set('isFocusedUserName', false)
                .set('isHiddenUserName', true)
                .set('mantra', '');
  },
  [SET_GREETING]: (state, action) => {
    const { greeting } = action.payload;
    return state.set('greeting', greeting)
                .set('isHiddenUserName', false);
  },  
  [SET_MANTRA]: (state) => {
    const { mantra, isHiddenUserName } = getRandomMantra();
    return state.set('mantra', `${mantra}${isHiddenUserName ? '.' : ','} `)
                .set('isHiddenUserName', isHiddenUserName);
  },
  [FOCUSE_USERNAME]: (state) => {
    return state.set('isFocusedUserName', true);
  },
  [BLUR_USERNAME]: (state) => {
    return state.set('isFocusedUserName', false);
  },
  [SET_USERNAME]: (state, action) => {
    const { userName } = action.payload;
    return state.set('userName', userName);
  },
  [TOGGLE_DROPDOWN]: (state) => {
    return state.set('isActiveDropdown', !state.get('isActiveDropdown'));
  }
}, initialState);
