import moment from 'moment';

const _defaultTodoData = {
  todos: [],
  selectedListChooserId: '1-today',
  listChoosers: {
    '1-inbox': {
      name: 'Inbox',
      date: '2018-12-10/20:30:42',
      empty: {
        title: 'Add a todo to get started',
        message: 'Switch to Today',
        linkTarget: '1-today'
      }
    },
    '1-today': {
      name: 'Today',
      date: '2018-12-10/20:30:42',
      empty: {
        title: 'Add a todo to get started',
        message: 'Switch to Inbox',
        linkTarget: '1-inbox'
      }
    },
    '1-done': {
      name: 'Done',
      date: '2018-12-10/20:30:42',
      empty: {
        title: 'No completed todos yet',
        message: 'get started in Today',
        linkTarget: '1-today'
      }
    }
  }
}


const DB = (function () {
  const LS_KEY = 'regacyTodoDB';
  let _DB = null;

  return {
    _saveDB() {
      localStorage.setItem(LS_KEY, JSON.stringify(_DB));
    },

    init() {
      _DB = JSON.parse(localStorage.getItem(LS_KEY)) || _defaultTodoData;
    },
  
    getAllData() {
      return {
        selectedListChooserId: _DB.selectedListChooserId,
        listChoosers: this.getListChoosers(),
        todos: this.getTodos(_DB.selectedListChooserId)
      }
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
      _DB.todos.push({
        id: `${date}-${_DB.todos.length}`,
        listChooserId: listChooserId,
        title: title,
        isDone: listChooserId === '1-done' ? true : false,
        date
       });
       this._saveDB();
    },
  
    updateTodoTitle(id, title) {
      const index = _DB.todos.findIndex(todo => todo.id === id);
      _DB.todos[index].title = title;
      this._saveDB();
    },
  
    updateTodoDone(id, isChecked) {
      const index = _DB.todos.findIndex(todo => todo.id === id);
      _DB.todos[index].isDone = isChecked;
      this._saveDB();
    },
  
    deleteTodo(id) {
      const index = _DB.todos.findIndex(todo => todo.id === id);
      _DB.todos.splice(index, 1);
      this._saveDB();
    },
  }
})();

DB.init();

export default DB;
