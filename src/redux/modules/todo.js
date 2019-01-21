import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { DEFAULT_LIST_CHOOSER_ID, DB } from 'lib/api/todo';

 
// action types
const INIT_TODO = 'todo/INIT_TODO';
const TOGGLE_DASHBOARD = 'todo/TOGGLE_DASHBOARD';
const TOGGLE_ADDTODO = 'todo/TOGGLE_ADDTODO';
const CHANGE_LIST_CHOOSER = 'todo/CHANGE_LIST_CHOOSER';
const ADD_TODO = 'todo/ADD_TODO';
const DELETE_TODO = 'todo/DELETE_TODO';
const UPDATE_TODO_DONE = 'todo/UPDATE_TODO_DONE';
const UPDATE_TODO_TITLE = 'todo/UPDATE_TODO_TITLE';
const UPDATE_TODO_CHOOSER = 'todo/UPDATE_TODO_CHOOSER';
const SET_DROPDOWN_HEIGHT = 'todo/SET_DROPDOWN_HEIGHT';
const CHNAGE_MAIN_FOCUS_MODE = 'todo/CHNAGE_MAIN_FOCUS_MODE';

// action creator
export const initTodo = createAction(INIT_TODO);
export const toggleDashboard = createAction(TOGGLE_DASHBOARD);
export const toggleAddTodo = createAction(TOGGLE_ADDTODO);
export const changeListChooser = createAction(CHANGE_LIST_CHOOSER);
export const addTodo = createAction(ADD_TODO);
export const deleteTodo = createAction(DELETE_TODO);
export const updateTodoDone = createAction(UPDATE_TODO_DONE);
export const updateTodoTitle = createAction(UPDATE_TODO_TITLE);
export const updateTodoChooser = createAction(UPDATE_TODO_CHOOSER);
export const setDropdownHeight = createAction(SET_DROPDOWN_HEIGHT);
export const changeMainFocusMode = createAction(CHNAGE_MAIN_FOCUS_MODE);

// initial state
const initialState = Map({
  status: 'INIT',
  isVisiblePopup: false,
  isVisibleAddTodo: false,
  selectedListChooserId: '',
  listChoosers: Map({}),
  todos: List([]),
  dropdownHeight: 0,
  mainFocusMode: 'INIT',
  mainFocusTodos: List([])
});

// reducer
export default handleActions({
  [INIT_TODO]: (state) => {
    const { 
      selectedListChooserId, 
      listChoosers, 
      todos,
      mainFocusTodos
    } = DB.getAllData();

    return state.set('selectedListChooserId', selectedListChooserId)
                .set('listChoosers', Map(fromJS(listChoosers)))
                .set('todos', List(fromJS(todos)))
                .set('isVisibleAddTodo', !!todos.length)
                .set('mainFocusMode', mainFocusTodos.length ? 'TODO' : 'PROMPT')
                .set('mainFocusTodos', List(fromJS(mainFocusTodos)))
                .set('status', 'LOADED');
  },
  [TOGGLE_DASHBOARD]: (state) => {
    return state.set('isVisiblePopup', !(state.get('isVisiblePopup')));
  },
  [TOGGLE_ADDTODO]: (state) => {
    return state.set('isVisibleAddTodo', !(state.get('isVisibleAddTodo')));
  },
  [CHANGE_LIST_CHOOSER]: (state, action) => {
    const { listChooserId } = action.payload;
    const todos = DB.getTodos({ listChooserId });

    DB.saveSelectedListChooser({ listChooserId });

    return state.set('selectedListChooserId', listChooserId)
                .set('todos', List(fromJS(todos)))
                .set('isVisibleAddTodo', !!todos.length);
  },
  [ADD_TODO]: (state, action) => {
    const { title, isMainFocus } = action.payload;
    let item;

    if (isMainFocus) {
      item = DB.addMainFocusTodo({ title });
      return state.set('listChoosers', Map(fromJS(DB.getListChoosers())))
                  .set('todos', state.get('todos').push(fromJS(item)))
                  .set('mainFocusMode', 'TODO')
                  .set('mainFocusTodos', state.get('mainFocusTodos').push(fromJS(item)))
                  .set('isVisibleAddTodo', true);
    } else {
      item = DB.addTodo({
        listChooserId: state.get('selectedListChooserId'), 
        title
      });
      return state.set('listChoosers', Map(fromJS(DB.getListChoosers())))
                  .set('todos', state.get('todos').push(fromJS(item)));
    }
  },
  [DELETE_TODO]: (state, action) => {
    const { id, isMainFocus } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    
    DB.deleteTodo({ id });

    if (isMainFocus) {
      const mainFocusIndex = state.get('mainFocusTodos').toJS().findIndex(todo => id === todo.id);
      return state.deleteIn(['todos', index])
                  .deleteIn(['mainFocusTodos', mainFocusIndex])
                  .set('mainFocusMode', !!(state.get('mainFocusTodos').size - 1) ? 'TODO' : 'PROMPT')
                  .set('listChoosers', Map(fromJS(DB.getListChoosers())))
                  .set('isVisibleAddTodo', !!(todos.size - 1));
    } else {
      return state.deleteIn(['todos', index])
                  .set('listChoosers', Map(fromJS(DB.getListChoosers())))
                  .set('isVisibleAddTodo', !!(todos.size - 1));
    }
  },
  [UPDATE_TODO_DONE]: (state, action) => {
    const { id, isDone, isMainFocus } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    
    DB.updateTodoDone({ id, isDone });

    if (state.get('selectedListChooserId') === DEFAULT_LIST_CHOOSER_ID.DONE) {
      return state.deleteIn(['todos', index])
                  .set('listChoosers', Map(fromJS(DB.getListChoosers())))
                  .set('isVisibleAddTodo', !!(todos.size - 1));
    } else {
      if (isMainFocus) {
        const mainFocusIndex = state.get('mainFocusTodos').toJS().findIndex(todo => id === todo.id);
        return state.setIn(['todos', index, 'isDone'], isDone)
                    .setIn(['mainFocusTodos', mainFocusIndex, 'isDone'], isDone)
                    .set('listChoosers', Map(fromJS(DB.getListChoosers())));
      } else {
        return state.setIn(['todos', index, 'isDone'], isDone)
                    .set('listChoosers', Map(fromJS(DB.getListChoosers())))
                    .set('isVisibleAddTodo', !!todos.size);
      }
    }
  },
  [UPDATE_TODO_TITLE]: (state, action) => {
    const { id, title, isMainFocus } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    
    DB.updateTodoTitle({ id, title });

    if (isMainFocus) {
      const mainFocusIndex = state.get('mainFocusTodos').toJS().findIndex(todo => id === todo.id);
      return state.setIn(['todos', index, 'title'], title)
                  .setIn(['mainFocusTodos', mainFocusIndex, 'title'], title)
    } else {
      return state.setIn(['todos', index, 'title'], title);
    }    
  },
  // [UPDATE_TODO_CHOOSER]: (state) => {
    
  // },
  [SET_DROPDOWN_HEIGHT]: (state, action) => {
    const { dropdownHeight } = action.payload;

    return state.set('dropdownHeight', dropdownHeight);
  },
  [CHNAGE_MAIN_FOCUS_MODE]: (state, action) => {
    const { mode } = action.payload;

    return state.set('mainFocusMode', mode);
  },
}, initialState);
