import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

// action types
const CHNAGE_MODE = 'greeting/CHNAGE_MODE';
const SET_LOADED_MODE = 'greeting/SET_LOADED_MODE';
const SET_GREETING = 'greeting/SET_GREETING';
const SET_MANTRA = 'greeting/SET_MANTRA';
const SET_USERNAME = 'greeting/SET_USERNAME';
const FOCUSE_USERNAME = 'greeting/FOCUSE_USERNAME';
const BLUR_USERNAME = 'greeting/BLUR_USERNAME';
const TOGGLE_CONTENT_HOVER = 'greeting/TOGGLE_CONTENT_HOVER';

// action creator
export const setLoadedMode = createAction(SET_LOADED_MODE);
export const changeMode = createAction(CHNAGE_MODE);
export const setGreeting = createAction(SET_GREETING);
export const setMantra = createAction(SET_MANTRA);
export const focuseUserName = createAction(FOCUSE_USERNAME);
export const blurUserName = createAction(BLUR_USERNAME);
export const setUserName = createAction(SET_USERNAME);
export const toggleContentHover = createAction(TOGGLE_CONTENT_HOVER);

// initial state
const initialState = Map({
  mode: 'GREETING',
  isChangedMode: false,
  isFocusedUserName: false,
  isHiddenUserName: false,
  isContentHover: false,
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
  [SET_MANTRA]: (state, action) => {
    const { mantra, isHiddenUserName } = action.payload;
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
    return state.set('userName', action.payload.userName);
  },
  [TOGGLE_CONTENT_HOVER]: (state, action) => {
    return state.set('isContentHover', action.payload.isContentHover);
  }
}, initialState);
