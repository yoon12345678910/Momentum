import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import DB from 'lib/api/todo';

 
// action types
const TOGGLE_DASHBOARD = 'todo/TOGGLE_DASHBOARD';
const TOGGLE_ADDTODO = 'todo/TOGGLE_ADDTODO';
const INIT_TODO = 'todo/INIT_TODO';
const CHANGE_LIST_CHOOSER = 'todo/CHANGE_LIST_CHOOSER';
const ADD_TODO = 'todo/ADD_TODO';
const DELETE_TODO = 'todo/DELETE_TODO';
const UPDATE_TODO_DONE = 'todo/UPDATE_TODO_DONE';
const UPDATE_TODO_TITLE = 'todo/UPDATE_TODO_TITLE';
const UPDATE_TODO_CHOOSER = 'todo/UPDATE_TODO_CHOOSER';
const SET_DROPDOWN_HEIGHT = 'todo/SET_DROPDOWN_HEIGHT';

// action creator
export const toggleDashboard = createAction(TOGGLE_DASHBOARD);
export const toggleAddTodo = createAction(TOGGLE_ADDTODO);
export const initTodo = createAction(INIT_TODO);
export const changeListChooser = createAction(CHANGE_LIST_CHOOSER);
export const addTodo = createAction(ADD_TODO);
export const deleteTodo = createAction(DELETE_TODO);
export const updateTodoDone = createAction(UPDATE_TODO_DONE);
export const updateTodoTitle = createAction(UPDATE_TODO_TITLE);
export const updateTodoChooser = createAction(UPDATE_TODO_CHOOSER);
export const setDropdownHeight = createAction(SET_DROPDOWN_HEIGHT);

// initial state
const initialState = Map({
  isVisiblePopup: false,
  isVisibleAddTodo: false,
  selectedListChooserId: '',
  listChoosers: Map({}),
  todos: List([]),
  dropdownHeight: 0,
});

// reducer
export default handleActions({
  [TOGGLE_DASHBOARD]: (state) => {
    return state.set('isVisiblePopup', !(state.get('isVisiblePopup')));
  },
  [TOGGLE_ADDTODO]: (state) => {
    return state.set('isVisibleAddTodo', !(state.get('isVisibleAddTodo')));
  },
  [INIT_TODO]: (state) => {
    const { selectedListChooserId, listChoosers, todos } = DB.getAllData();
    return state.set('selectedListChooserId', selectedListChooserId)
                .set('listChoosers', Map(listChoosers))
                .set('todos', List(todos))
                .set('isVisibleAddTodo', !!todos.length);
  },
  [CHANGE_LIST_CHOOSER]: (state, action) => {
    const { listChooserId } = action.payload;
    const todos = DB.getTodos(listChooserId);
    DB.saveSelectedListChooser(listChooserId);
    return state.set('selectedListChooserId', listChooserId)
                .set('todos', List(todos))
                .set('isVisibleAddTodo', !!todos.length);
  },
  [ADD_TODO]: (state, action) => {
    const { title } = action.payload;
    const todos = state.get('todos');
    const item = DB.addTodo(state.get('selectedListChooserId'), title);
    const listChoosers = DB.getListChoosers();
    return state.set('listChoosers', Map(listChoosers))
                .set('todos', todos.push(item));
  },
  [DELETE_TODO]: (state, action) => {
    const { id } = action.payload;
    DB.deleteTodo(id);
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    const listChoosers = DB.getListChoosers();
    return state.deleteIn(['todos', index])
                .set('listChoosers', Map(listChoosers))
                .set('isVisibleAddTodo', !!todos.size);
  },
  [UPDATE_TODO_DONE]: (state, action) => {
    const { id, isDone } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    const item = DB.updateTodoDone(id, isDone);
    console.log('tem', item, state.getIn(['todos', index]))
    const listChoosers = DB.getListChoosers();
    return state.setIn(['todos', index], item)
                // .set('listChoosers', Map(listChoosers))
                .set('isVisibleAddTodo', !!todos.size);
  },
  [UPDATE_TODO_TITLE]: (state, action) => {
    const { id, title } = action.payload;
    DB.updateTodoTitle(id, title);
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    return state.updateIn(['todos', index, 'title'], title => title);
  },
  // [UPDATE_TODO_CHOOSER]: (state) => {
    
  // },
  [SET_DROPDOWN_HEIGHT]: (state, action) => {
    const { dropdownHeight } = action.payload;
    return state.set('dropdownHeight', dropdownHeight);
  }
}, initialState);
