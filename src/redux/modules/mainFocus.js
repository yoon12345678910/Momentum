import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { DB } from 'lib/api/todo';

 
// action types
const INIT_TODO = 'mainFocus/INIT_TODO';
const CHNAGE_MODE = 'mainFocus/CHNAGE_MODE';
const CREATE_TODO = 'mainFocus/CREATE_TODO';
const DELETE_TODO = 'mainFocus/DELETE_TODO';
const UPDATE_TODO_DONE = 'mainFocus/UPDATE_TODO_DONE';
const UPDATE_TODO_TITLE = 'mainFocus/UPDATE_TODO_TITLE';

// action creator
export const initTodo = createAction(INIT_TODO);
export const changeMode = createAction(CHNAGE_MODE);
export const createTodo = createAction(CREATE_TODO);
export const deleteTodo = createAction(DELETE_TODO);
export const updateTodoDone = createAction(UPDATE_TODO_DONE);
export const updateTodoTitle = createAction(UPDATE_TODO_TITLE);

// initial state
const initialState = Map({
  mode: 'INIT',
  todos: List([])
});

// reducer
export default handleActions({
  [INIT_TODO]: (state) => {
    const todos = DB.getInitialMainFocus();
    return state.set('mode', todos.length ? 'TODO' : 'PROMPT')
                .set('todos', List(fromJS(todos)));
  },
  [CHNAGE_MODE]: (state, action) => {
    const { mode } = action.payload;
    return state.set('mode', mode);
  },
  [CREATE_TODO]: (state, action) => {
    const { title } = action.payload;
    const todos = state.get('todos');
    const result = DB.createTodoMainFocus({ title });
    return state.set('todos', todos.push(fromJS(result.todo)))
                .set('mode', 'TODO');
  },
  [DELETE_TODO]: (state, action) => {
    const { id, isMainFocus } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);

    if (isMainFocus) DB.deleteTodo({ id });

    return state.deleteIn(['todos', index])
                .set('mode', !!(todos.size - 1) ? 'TODO' : 'PROMPT');
  },
  [UPDATE_TODO_DONE]: (state, action) => {
    const { id, isDone, isMainFocus } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);
    
    if (isMainFocus) DB.updateTodoDone({ id, isDone });

    return state.setIn(['todos', index, 'isDone'], isDone);
  },
  [UPDATE_TODO_TITLE]: (state, action) => {
    const { id, title, isMainFocus } = action.payload;
    const todos = state.get('todos');
    const index = todos.toJS().findIndex(todo => id === todo.id);

    if (isMainFocus) DB.updateTodoTitle({ id, title });
    
    return state.setIn(['todos', index, 'title'], title);
  }
}, initialState);