import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { DEFAULT_LIST_CHOOSER_ID, DB } from 'lib/api/todo';

 
// action types
const INIT_TODO = 'todo/INIT_TODO';
const TOGGLE_DASHBOARD = 'todo/TOGGLE_DASHBOARD';
const TOGGLE_ADDTODO = 'todo/TOGGLE_ADDTODO';
const CHANGE_LIST_CHOOSER = 'todo/CHANGE_LIST_CHOOSER';
const CREATE_TODO = 'todo/CREATE_TODO';
const DELETE_TODO = 'todo/DELETE_TODO';
const UPDATE_TODO_DONE = 'todo/UPDATE_TODO_DONE';
const UPDATE_TODO_TITLE = 'todo/UPDATE_TODO_TITLE';
const UPDATE_TODO_CHOOSER = 'todo/UPDATE_TODO_CHOOSER';
const SET_DROPDOWN_HEIGHT = 'todo/SET_DROPDOWN_HEIGHT';
const CREATE_TODO_MAIN_FOCUS = 'todo/CREATE_TODO_MAIN_FOCUS';
const DELETE_TODO_MAIN_FOCUS = 'todo/DELETE_TODO_MAIN_FOCUS';
const UPDATE_TODO_DONE_MAIN_FOCUS = 'todo/UPDATE_TODO_DONE_MAIN_FOCUS';

// action creator
export const initTodo = createAction(INIT_TODO);
export const toggleDashboard = createAction(TOGGLE_DASHBOARD);
export const toggleAddTodo = createAction(TOGGLE_ADDTODO);
export const changeListChooser = createAction(CHANGE_LIST_CHOOSER);
export const createTodo = createAction(CREATE_TODO);
export const deleteTodo = createAction(DELETE_TODO);
export const updateTodoDone = createAction(UPDATE_TODO_DONE);
export const updateTodoTitle = createAction(UPDATE_TODO_TITLE);
export const updateTodoChooser = createAction(UPDATE_TODO_CHOOSER);
export const setDropdownHeight = createAction(SET_DROPDOWN_HEIGHT);
export const createTodoMainFocus = createAction(CREATE_TODO_MAIN_FOCUS);
export const deleteTodoMainFocus = createAction(DELETE_TODO_MAIN_FOCUS);
export const updateTodoDoneMainFocus = createAction(UPDATE_TODO_DONE_MAIN_FOCUS);

// initial state
const initialState = Map({
  status: 'INIT',
  isVisiblePopup: false,
  isVisibleAddTodo: false,
  selectedListChooserId: '',
  listChoosers: Map({}),
  todos: List([]),
  dropdownHeight: 0
});

// reducer
export default handleActions({
  [INIT_TODO]: (state) => {
    const { 
      selectedListChooserId, 
      listChoosers, 
      todos
    } = DB.getInitialTodo();
    return state.set('selectedListChooserId', selectedListChooserId)
                .set('listChoosers', Map(fromJS(listChoosers)))
                .set('todos', List(fromJS(todos)))
                .set('isVisibleAddTodo', !!todos.length)
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
    const result = DB.changeSelectedListChooser({ listChooserId });
    return state.set('selectedListChooserId', listChooserId)
                .set('todos', List(fromJS(result.todos)))
                .set('isVisibleAddTodo', !!result.todos.length);
  },
  [CREATE_TODO]: (state, action) => {
    const { title } = action.payload;
    const result = DB.createTodo({
      listChooserId: state.get('selectedListChooserId'), 
      title
    });
    return state.set('listChoosers', Map(fromJS(result.listChoosers)))
                .set('todos', state.get('todos').push(fromJS(result.todo)));
  },
  [DELETE_TODO]: (state, action) => {
    const { id, isMainFocus } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    if (!isMainFocus) DB.deleteTodo({ id });
    return state.deleteIn(['todos', index])
                .set('listChoosers', Map(fromJS(DB.getListChoosers())))
                .set('isVisibleAddTodo', !!(todos.size - 1));
  },
  [UPDATE_TODO_DONE]: (state, action) => {
    const { id, isDone, isMainFocus } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    if (!isMainFocus) DB.updateTodoDone({ id, isDone });
    if (state.get('selectedListChooserId') === DEFAULT_LIST_CHOOSER_ID.DONE) {
      return state.deleteIn(['todos', index])
                  .set('listChoosers', Map(fromJS(DB.getListChoosers())))
                  .set('isVisibleAddTodo', !!(todos.size - 1));
    } else {
      return state.setIn(['todos', index, 'isDone'], isDone)
                  .set('listChoosers', Map(fromJS(DB.getListChoosers())));
    }
  },
  [UPDATE_TODO_TITLE]: (state, action) => {
    const { id, title } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    DB.updateTodoTitle({ id, title });
    return state.setIn(['todos', index, 'title'], title);
  },
  [SET_DROPDOWN_HEIGHT]: (state, action) => {
    const { dropdownHeight } = action.payload;
    return state.set('dropdownHeight', dropdownHeight);
  },
  [CREATE_TODO_MAIN_FOCUS]: (state, action) => {
    if (state.get('status') === 'INIT') return;
    if (state.get('selectedListChooserId') !== DEFAULT_LIST_CHOOSER_ID.TODAY) return;
    const { todo } = action.payload;
    return state.set('listChoosers', Map(fromJS(DB.getListChoosers())))
                .set('todos', state.get('todos').push(fromJS(todo)));
  },
  [DELETE_TODO_MAIN_FOCUS]: (state, action) => {
    if (state.get('status') === 'INIT') return;
    const { id } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    if (index === -1) {
      return state.set('listChoosers', Map(fromJS(DB.getListChoosers())));
    } else {
      return state.deleteIn(['todos', index])
                  .set('listChoosers', Map(fromJS(DB.getListChoosers())))
                  .set('isVisibleAddTodo', !!(todos.size - 1));
    }
  },
  [UPDATE_TODO_DONE_MAIN_FOCUS]: (state, action) => {
    if (state.get('status') === 'INIT') return;
    const { id, isDone, todo } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);

    if (state.get('selectedListChooserId') === DEFAULT_LIST_CHOOSER_ID.DONE) {
      if (index === -1) {
        return state.set('listChoosers', Map(fromJS(DB.getListChoosers())))
                    .set('todos', state.get('todos').push(fromJS(todo)))
                    .set('isVisibleAddTodo', true);
      } else {
        return state.deleteIn(['todos', index])
                    .set('listChoosers', Map(fromJS(DB.getListChoosers())))
                    .set('isVisibleAddTodo', !!(todos.size - 1));
      }
    } else {
      if (index === -1) {
        return state.set('listChoosers', Map(fromJS(DB.getListChoosers())));
      } else {
        return state.setIn(['todos', index, 'isDone'], isDone)
                    .set('listChoosers', Map(fromJS(DB.getListChoosers())));
      }
    }
  }
}, initialState);
