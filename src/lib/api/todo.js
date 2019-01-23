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


    getInitialTodo() {
      const result = {
        selectedListChooserId: _DB.selectedListChooserId,
        listChoosers: this.getListChoosers(),
        todos: this.getTodos({ listChooserId: _DB.selectedListChooserId })
      };
      return result;
    },


    getInitialMainFocus() {
      const result = _DB.todos.filter(todo => !!todo.isMainFocus);
      return result;
    },


    getListChoosers() {
      const listChoosers = Object.keys(_DB.listChoosers)
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
    

    changeSelectedListChooser({ listChooserId }) {
      _DB.selectedListChooserId = listChooserId;

      this._saveDB();

      return {
        todos: this.getTodos({ listChooserId })
      };
    },


    createListChooser({ name }) {
      const date = moment().format('YYYY-MM-DD HH:mm:ss');
      const id = `${date}-${Object.keys(_DB.listChoosers).length}`;
      const listChooser = {
        id,
        date,
        name: name.toUpperCase(),
        empty: {
          title: 'No todos yet',
          message: 'Add a todo to get started',
        },
        isDefault: false
      };

      _DB.listChoosers[id] = listChooser;
      this._saveDB();

      return {
        listChooser
      };
    },


    deleteListChooser({ id }) {
      delete _DB.listChoosers[id];
      this._saveDB();

      return {};
    },
  

    createTodo({ listChooserId, title }) {
      const date = moment().format('YYYY-MM-DD HH:mm:ss');
      const todo = {
        id: `${date}-${_DB.todos.length}`,
        listChooserId,
        title: title,
        isDone: listChooserId === DEFAULT_LIST_CHOOSER_ID.DONE ? true : false,
        isMainFocus: false,
        date
      };

      _DB.todos.push(todo);
      this._saveDB();

      return {
        listChoosers: this.getListChoosers(),
        todo
      };
    },

    
    createTodoMainFocus({ title }) {
      const date = moment().format('YYYY-MM-DD HH:mm:ss');
      const todo = {
        id: `${date}-${_DB.todos.length}`,
        listChooserId: DEFAULT_LIST_CHOOSER_ID.TODAY,
        title: title,
        isDone: false,
        isMainFocus: true,
        date,
      };

      _DB.todos.push(todo);
      this._saveDB();

      return {
        todo
      };
    },
  

    updateTodoDone({ id, isDone }) {
      const index = _DB.todos.findIndex(todo => id === todo.id);
      const item = _DB.todos[index];

      item.isDone = isDone;
      this._saveDB();

      return {
        listChoosers: this.getListChoosers()
      };
    },
    

    deleteTodo({ id }) {
      const index = _DB.todos.findIndex(todo => id === todo.id);
      
      _DB.todos.splice(index, 1);
      this._saveDB();

      return {
        listChoosers: this.getListChoosers()
      };
    },


    updateTodoTitle({ id, title }) {
      const index = _DB.todos.findIndex(todo => id === todo.id);

      _DB.todos[index].title = title;
      this._saveDB();

      return {};
    }
  }
})();