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
      },
      isDefault: true
    },
    '1-today': {
      name: 'Today',
      date: '2018-12-10 20:30:42',
      empty: {
        title: 'No todos yet',
        message: 'Switch to Inbox',
        targetLink: '1-inbox'
      },
      isDefault: true
    },
    '1-done': {
      name: 'Done',
      date: '2018-12-10 20:30:42',
      empty: {
        title: 'No completed todos yet',
        message: 'Get started in Today',
        targetLink: '1-today'
      },
      isDefault: true
    }
  }
};

export const DEFAULT_LIST_CHOOSER_ID = {
  INBOX: '1-inbox',
  TODAY: '1-today',
  DONE: '1-done'
};


export const DB = (function () {
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
        todos: this.getTodos({ listChooserId: _DB.selectedListChooserId }),
        mainFocusTodos: _DB.todos.filter(todo => !!todo.isMainFocus)
      };
      
      return result;
    },
  

    getListChoosers() {
      const listChoosers =  Object.keys(_DB.listChoosers)
        .reduce((acc, key) => {
          const listChooser = _DB.listChoosers[key];
          listChooser.todoCnt = (() => {
            return _DB.todos.filter((todo) => {
              if (key === DEFAULT_LIST_CHOOSER_ID.DONE) {
                return todo.isDone === true;
              } else {
                return todo.listChooserId === key && todo.isDone === false;
              }
            }).length;
          })();
          acc[key] = listChooser;
          return acc;
        }, {});

      return listChoosers;
    },
  

    getTodos({ listChooserId }) {
      const todos = _DB.todos.filter((todo) => {
        if (listChooserId === DEFAULT_LIST_CHOOSER_ID.DONE) {
          return todo.isDone === true;
        } else {
          return todo.listChooserId === listChooserId;
        }
      });

      return todos;
    },
  

    saveSelectedListChooser({ listChooserId }) {
      _DB.selectedListChooserId = listChooserId;
      this._saveDB();
    },


    addListChooser({ name }) {
      const date = moment().format('YYYY-MM-DD HH:mm:ss');
      const id = `${date}-${Object.keys(_DB.listChoosers).length}`;
      const item = {
        id,
        date,
        name: name.toUpperCase(),
        empty: {
          title: 'No todos yet',
          message: 'Add a todo to get started',
        },
        isDefault: false
      };

      _DB.listChoosers[id] = item;
      this._saveDB();

      return item;
    },


    deleteListChooser({ id }) {
      delete _DB.listChoosers[id];
      this._saveDB();
    },
  

    addTodo({ listChooserId, title }) {
      const date = moment().format('YYYY-MM-DD HH:mm:ss');
      const item = {
        id: `${date}-${_DB.todos.length}`,
        listChooserId,
        title: title,
        isDone: listChooserId === DEFAULT_LIST_CHOOSER_ID.DONE ? true : false,
        isMainFocus: false,
        date
      };

      _DB.todos.push(item);
      this._saveDB();

      return item;
    },
  

    updateTodoDone({ id, isDone }) {
      const index = _DB.todos.findIndex(todo => id === todo.id);
      const item = _DB.todos[index];

      item.isDone = isDone;
      this._saveDB();
    },
    

    deleteTodo({ id }) {
      const index = _DB.todos.findIndex(todo => id === todo.id);
      
      _DB.todos.splice(index, 1);
      this._saveDB();
    },


    updateTodoTitle({ id, title }) {
      const index = _DB.todos.findIndex(todo => id === todo.id);

      _DB.todos[index].title = title;
      this._saveDB();
    },


    addMainFocusTodo({ title }) {
      const date = moment().format('YYYY-MM-DD HH:mm:ss');
      const item = {
        id: `${date}-${_DB.todos.length}`,
        listChooserId: DEFAULT_LIST_CHOOSER_ID.TODAY,
        title: title,
        isDone: false,
        isMainFocus: true,
        date,
      };

      _DB.todos.push(item);
      this._saveDB();

      return item;
    },


  }
})();