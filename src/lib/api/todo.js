import moment from 'moment';

const _defaultTodoData = {
  todos: [], 
  selectedListChooserId: '1-today',
  listChoosers: {
    '1-inbox': {
      name: 'Inbox',
      date: '2018-12-10 20:30:42',
      empty: {
        title: 'Add a todo to get started',
        message: 'Switch to Today',
        targetLink: '1-today'
      }
    },
    '1-today': {
      name: 'Today',
      date: '2018-12-10 20:30:42',
      empty: {
        title: 'Add a todo to get started',
        message: 'Switch to Inbox',
        targetLink: '1-inbox'
      }
    },
    '1-done': {
      name: 'Done',
      date: '2018-12-10 20:30:42',
      empty: {
        title: 'No completed todos yet',
        message: 'get started in Today',
        targetLink: '1-today'
      }
    }
  }
};


const DB = (function () {
  const LS_KEY = 'todoDB';
  const _DB = JSON.parse(localStorage.getItem(LS_KEY)) || _defaultTodoData;

  return {
    _saveDB() {
      localStorage.setItem(LS_KEY, JSON.stringify(_DB));
    },
  
    getAllData() {
      const result = {
        selectedListChooserId: _DB.selectedListChooserId,
        listChoosers: this.getListChoosers(),
        todos: this.getTodos(_DB.selectedListChooserId)
      }
      return result;
    },
  
    getListChoosers() {
      return Object.keys(_DB.listChoosers)
        .reduce((acc, key) => {
          const listChooser = _DB.listChoosers[key];
          listChooser.todoCnt = (() => {
            return _DB.todos.filter((todo) => {
              if (key === '1-done') {
                return todo.isDone === true;
              } else {
                return todo.listChooserId === key && todo.isDone === false;
              }
            }).length;
          })();
          acc[key] = listChooser;
          return acc;
        }, {});
    },
  
    getTodos(listChooserId) {
      return _DB.todos.filter((todo) => {
        if (listChooserId === '1-done') {
          return todo.isDone === true;
        } else {
          return todo.listChooserId === listChooserId;
        }
      });
    },
  
    saveSelectedListChooser(listChooserId) {
      _DB.selectedListChooserId = listChooserId;
      this._saveDB();
    },
  
    addTodo(listChooserId, title) {
      const date = moment().format('YYYYMMDDHHmmss');
      const item = {
        id: `${date}-${_DB.todos.length}`,
        listChooserId: listChooserId,
        title: title,
        isDone: listChooserId === '1-done' ? true : false,
        date
      };
      _DB.todos.push(item);
      this._saveDB();
      return item;
    },
  
    updateTodoDone(id, isDone) {
      const index = _DB.todos.findIndex(todo => id === todo.id);
      _DB.todos[index].isDone = isDone;
      this._saveDB();
    },
    
    deleteTodo(id) {
      const index = _DB.todos.findIndex(todo => id === todo.id);
      _DB.todos.splice(index, 1);
      this._saveDB();
    },

    updateTodoTitle(id, title) {
      const index = _DB.todos.findIndex(todo => id === todo.id);
      _DB.todos[index].title = title;
      this._saveDB();
    },
  }
})();

export default DB;