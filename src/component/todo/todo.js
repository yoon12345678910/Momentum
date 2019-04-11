export default class {
  constructor() {
    this.LS_KEY_TODO_LIST = 'todo-list';
    this.LS_KEY_TODO_CHOOSER = 'todo-chooser';
    this.LS_KEY_CURRENT = 'todo-current';
    this.currentListChooserId = '';
    this.enterTodo = '';
    this.enterListChooser = '';
    this.listChoosers = {};
    this.todos = [];
    this.isInit = false;
    this.activeWidgetWrapper = false;
    this.activeChooserDropdown = false;
    this.containerEl = document.querySelector('#todo');
    this.dashToggleEl = this.containerEl.querySelector('.widget-dash');
    this.todoWidgetWrapperEl = this.containerEl.querySelector('.widget-wrapper');
    this.todoWidgetPopupEl = this.todoWidgetWrapperEl.querySelector('.widget-popup');
    this.listChooserToggleEl = this.todoWidgetPopupEl.querySelector('.list-chooser-toggle');
    this.listChooserNameEl = this.listChooserToggleEl.querySelector('.active-list-name');
    this.listChooserDropdownEl = this.todoWidgetPopupEl.querySelector('.dropdown.list-chooser');
    this.todoListWrapperEl = this.todoWidgetPopupEl.querySelector('.todo-list-wrapper');
    this.todoListEl = this.todoListWrapperEl.querySelector('.todo-list');
    this.footerEl = this.todoWidgetPopupEl.querySelector('.todo-footer');
    this.todoCreateInputEl = this.footerEl.querySelector('input');
    this.onToggleWidgetWrapper;
    this.onToggleChooserDropdown;
  }

  init() {
    this.dashToggleEl.addEventListener('click', this._handleToggleWidgetWrapper.bind(this));

    this.listChooserToggleEl.addEventListener('click', this._handleToggleChooserDropdown.bind(this));

    this.listChooserDropdownEl.addEventListener('click', this._handleClickChooserDropdown.bind(this));

    this.listChooserDropdownEl.addEventListener('mouseover', function () {
      this.listChooserToggleEl.classList.add('hover');
    }.bind(this));

    this.listChooserDropdownEl.addEventListener('mouseout', function () {
      this.listChooserToggleEl.classList.remove('hover');
    }.bind(this));

    this.todoCreateInputEl.addEventListener('keydown', function (e) {
      const keyCode = e.keyCode ? e.keyCode : e.which;
      if (keyCode === 13) {
        this._handleNewList();
      }
    }.bind(this));

    
  }

  _loadLS() {
    const loadedChooser = localStorage.getItem(this.LS_KEY_TODO_CHOOSER);
    const loadedList = localStorage.getItem(this.LS_KEY_TODO_LIST);
    const loadedCurrent = localStorage.getItem(this.LS_KEY_CURRENT);

    if (loadedChooser !== null) {
      this.listChoosers = JSON.parse(loadedChooser);
    }

    if (loadedList !== null) {
      this.todos = JSON.parse(loadedList);
    }

    if (loadedCurrent !== null) {
      this.currentListChooserId = loadedCurrent;
    }

    this._paintChooser();
    this._paintList();
  }

  _saveLS() {
    localStorage.setItem(this.LS_KEY_TODO_CHOOSER, JSON.stringify(this.listChoosers));
    localStorage.setItem(this.LS_KEY_TODO_LIST, JSON.stringify(this.todos));
    localStorage.setItem(this.LS_KEY_CURRENT, this.currentListChooserId);
  }
  
  _handleToggleWidgetWrapper (e) {
    const changeDisplay = () => {
      this.activeWidgetWrapper = this.activeWidgetWrapper ? false : true;
      this.containerEl.classList.toggle('show');
      this.todoWidgetPopupEl.classList.toggle('scrolling');
      this.todoWidgetWrapperEl.classList.toggle('show-fade-in');
    }

    const outsideClickListener = (e) => {
      if (this.dashToggleEl.contains(e.target)) return;
      if (!this.todoWidgetWrapperEl.contains(e.target)) {
        changeDisplay();
        removeClickListener();
      }
    }

    const removeClickListener = () => {
      document.removeEventListener('click', this.onToggleWidgetWrapper);
    }

    changeDisplay();

    if (this.activeWidgetWrapper) {
      if (!this.isInit) {
        this._loadLS();
        this.isInit = true;
      }
      this.onToggleWidgetWrapper = outsideClickListener.bind(this);
      document.addEventListener('click', this.onToggleWidgetWrapper);
      this._resizeListBox();
      this.todoCreateInputEl.focus();

      this._hideChooserDropdown();
    } else {
      removeClickListener();
    }
  }

  _handleToggleChooserDropdown (e) {
    const changeDisplay = () => {
      this.activeChooserDropdown = this.activeChooserDropdown ? false : true;
      this.listChooserDropdownEl.classList.toggle('show');
      this._resizeListBox(this.listChooserDropdownEl.offsetHeight);
    }

    const outsideClickListener = (e) => {
      if (this.listChooserToggleEl.contains(e.target)) return;
      if (!this.listChooserDropdownEl.contains(e.target)) {
        changeDisplay();
        removeClickListener();
      }
    }

    const removeClickListener = () => {
      document.removeEventListener('click', this.onToggleChooserDropdown);
    }

    changeDisplay();

    if (this.activeChooserDropdown) {
      this.onToggleChooserDropdown = outsideClickListener.bind(this);
      document.addEventListener('click', this.onToggleChooserDropdown);
    } else {
      removeClickListener();
    }
  }

  _hideChooserDropdown () {
    this.activeChooserDropdown = false;
    this.listChooserDropdownEl.classList.remove('show');
    this.listChooserToggleEl.classList.remove('hover');
    document.removeEventListener('click', this.onToggleChooserDropdown);
  }

  _handleClickChooserDropdown (e) {
    e.stopPropagation();

    const item = e.target.closest('.list-chooser-item');
    this._hideChooserDropdown();
    if (item && !item.hasClass('active')) {
      this.currentListChooserId = item.getAttribute('data-list-id');
      this._saveLS();
      this._loadLS();
    }
  }

  _paintChooser() {
    while (this.listChooserDropdownEl.hasChildNodes()) {
      this.listChooserDropdownEl.removeChild(this.listChooserDropdownEl.firstChild); 
    }

    for (const [key, item] of Object.entries(this.listChoosers)) {
      const itemEl = document.createElement('li');
      const nameEl = document.createElement('span');
      const countEl = document.createElement('span');
      const todoList = this.todos.filter(item => {
        if (key === '1-done') {
          return !!item.isDone;
        } else {
          return item .listId === key && !item.isDone;
        }
      });      

      itemEl.classList.add('list-chooser-item');
      nameEl.classList.add('list-name');
      countEl.classList.add('todo-count');

      nameEl.innerText = item.name;
      countEl.innerText = todoList.length;
      itemEl.setAttribute('data-list-id', key);

      itemEl.appendChild(nameEl);
      itemEl.appendChild(countEl);

      if (key === this.currentListChooserId) {
        itemEl.classList.add('active');
        this.listChooserNameEl.innerText = item.name;
      }

      this.listChooserDropdownEl.appendChild(itemEl);
    }

    const addItemEl = document.createElement('li');
    const addItemIconWrapperEl = document.createElement('span');
    const addItemIconEl = document.createElement('i');
    const addItemInputEl = document.createElement('input');

    addItemEl.classList.add('todo-list-add-row');
    addItemIconWrapperEl.classList.add('list-chooser-add-icon');
    addItemIconEl.classList.add('fa', 'fa-plus');
    addItemInputEl.classList.add('list-chooser-add-input');
    addItemInputEl.setAttribute('type', 'text');
    addItemInputEl.setAttribute('placeholder', 'New List');

    addItemEl.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    addItemInputEl.addEventListener('keydown', function (e) {
      const keyCode = e.keyCode ? e.keyCode : e.which;
      if (keyCode === 13) {
        this._handleNewChooser(addItemInputEl);
      }
    }.bind(this));

    addItemIconWrapperEl.appendChild(addItemIconEl);
    addItemEl.appendChild(addItemIconWrapperEl);
    addItemEl.appendChild(addItemInputEl);
    this.listChooserDropdownEl.appendChild(addItemEl);
  }

  _paintList() {
    const todoList = this.todos.filter(item => {
      if (this.currentListChooserId === '1-done') {
        return !!item.isDone;
      } else {
        return item.listId === this.currentListChooserId;
      }
    });

    while (this.todoListEl.hasChildNodes()) {
      this.todoListEl.removeChild(this.todoListEl.firstChild); 
    }

    if (!todoList.length) {
      this._inactiveFooter();
      const emptyEl = document.createElement('li');
      const titleEl = document.createElement('p');
      const buttonEl = document.createElement('button');
      const linkEl = document.createElement('div');

      titleEl.innerText = `${this.listChoosers[this.currentListChooserId].empty.title}`;
      buttonEl.innerText = 'New Todo';
      linkEl.innerText = `${this.listChoosers[this.currentListChooserId].empty.link}`;

      emptyEl.classList.add('empty');
      titleEl.classList.add('empty-title');
      buttonEl.classList.add('button', 'new-todo-button');

      emptyEl.appendChild(titleEl);  
      if (this.listChoosers[this.currentListChooserId].empty.linkTarget) {
        const iconEl = document.createElement('i');
        linkEl.classList.add('empty-link');
        iconEl.classList.add('fa', 'fa-angle-right');
        linkEl.setAttribute('link-target', this.currentListChooserId);
        iconEl.setAttribute('aria-hidden', true);

        linkEl.addEventListener('click', function (e) {
          this.currentListChooserId = this.listChoosers[this.currentListChooserId].empty.linkTarget;
          this._paintChooser();
          this._paintList();
        }.bind(this));

        linkEl.appendChild(iconEl);
      } else {
        linkEl.classList.add('empty-description');
      }
      
      emptyEl.appendChild(linkEl);
      emptyEl.appendChild(buttonEl);

      buttonEl.addEventListener('click', function (e) {
        buttonEl.style.opacity = 0;
        this._activeFooter();
        this.todoCreateInputEl.focus();
      }.bind(this));

      this.todoListEl.appendChild(emptyEl);
    } else {
      this._activeFooter();
      
      for (const item of todoList) {
        const itemEl = document.createElement('li');
        const actionEl = document.createElement('div');
        const moveItemToggleEl = document.createElement('div');
        const moveItemIconEl = document.createElement('i');
        const deleteItemToggleEl = document.createElement('div');
        const deleteItemIconEl = document.createElement('i');
        const checkboxWrapperEl = document.createElement('label');
        const checkboxInputEl = document.createElement('input');
        const titleEl = document.createElement('span');

        itemEl.classList.add('todo-item');
        actionEl.classList.add('todo-item-action');
        moveItemToggleEl.classList.add('todo-move-list-toggle', 'icon-wrapper');
        moveItemIconEl.classList.add('fa', 'fa-folder');
        deleteItemToggleEl.classList.add('todo-delete-list-toggle', 'icon-wrapper');
        deleteItemIconEl.classList.add('fa', 'fa-times');
        checkboxInputEl.classList.add('todo-item-checkbox');
        titleEl.classList.add('todo-item-title');
        
        moveItemIconEl.setAttribute('aria-hidden', true);
        deleteItemIconEl.setAttribute('aria-hidden', true);
        checkboxInputEl.setAttribute('type', 'checkbox');
        itemEl.setAttribute('data-id', item.id);
        titleEl.innerText = item.title;

        if (item.isDone === true) {
          itemEl.classList.add('done');
          checkboxInputEl.checked = true;
        } else {
          checkboxInputEl.checked = false;
        }

        checkboxInputEl.addEventListener('click', function (e) {
          if (this.currentListChooserId === '1-done') {
            e.stopPropagation();
            this._hideChooserDropdown();
            this._handleDeleteList(itemEl);
          } else {
            this._handleDoneList(itemEl, checkboxInputEl);
          }
        }.bind(this));

        titleEl.addEventListener('dblclick', function () {
          this.enterTitle = titleEl.innerText;
          titleEl.activeContenteditable();
        }.bind(this));

        titleEl.addEventListener('keydown', function (e) {
          const keyCode = e.keyCode ? e.keyCode : e.which;
          if (keyCode === 13) {
            e.preventDefault();
            this.blur();
          }
        });

        titleEl.addEventListener('focusout', this._handleModifyTitle.bind(this, itemEl, titleEl));
        moveItemToggleEl.addEventListener('click', function (e) {
          console.log('move')
        });

        deleteItemToggleEl.addEventListener('click', function (e) {
          e.stopPropagation();
          this._hideChooserDropdown();
          this._handleDeleteList(itemEl);
        }.bind(this));

        moveItemToggleEl.appendChild(moveItemIconEl);
        deleteItemToggleEl.appendChild(deleteItemIconEl);
        actionEl.appendChild(moveItemToggleEl);
        actionEl.appendChild(deleteItemToggleEl);
        checkboxWrapperEl.appendChild(checkboxInputEl);

        itemEl.appendChild(actionEl);
        itemEl.appendChild(checkboxWrapperEl);
        itemEl.appendChild(titleEl);
        
        this.todoListEl.appendChild(itemEl);
      }
    }

    this._resizeListBox();
  }

  _handleNewChooser (addItemInputEl) {
    const currentValue = addItemInputEl.value.replace(/(^\s*)|(\s*$)/, ''); // 앞뒤 공백 제거
    
    if (!currentValue.length) return;

    const id = `2-${currentValue.replace(/\s/gi, '').toLowerCase()}`;

    if (this.listChoosers[id]) {
      console.log('이미 존재하는 list-chooser-item 입니다');
      return;
    }

    this.listChoosers[id] = {
      name: currentValue.capitalizeFirstLetter(),
      date: getCurrentTime(),
      empty: {
        title: 'No todos yet',
        link: 'Add a todo to get started'
      }
    };
    addItemInputEl.value = '';

    this.currentListChooserId = id;
    this._saveLS();
    this._loadLS();
  }

  _handleNewList () {
    const currentValue = this.todoCreateInputEl.value.replace(/(^\s*)|(\s*$)/, '');
    if (!currentValue.length) return;

    this.todoCreateInputEl.value = '';
    this.todos.push({
      listId: this.currentListChooserId,
      id: `${window.getCurrentTime()}-#${this.todos.length}`,
      title: currentValue,
      checked: false,
      isDone: this.currentListChooserId === '1-done' ? true : false,
      date: window.getCurrentTime()
    });
    this._saveLS();
    this._paintChooser();
    this._paintList();
    this.todoListEl.scrollTop = this.todoListEl.scrollHeight;
  }
  
  _handleDeleteList (itemEl) {
    const id = itemEl.getAttribute('data-id');
    this.todos = this.todos.filter(item => item.id !== id);
    this.todoListEl.removeChild(itemEl);
    this._saveLS();
    this._loadLS();
  }

  _handleDoneList (itemEl, checkboxEl) {
    const isChecked = checkboxEl.checked;
    isChecked ? itemEl.classList.add('done') : itemEl.classList.remove('done');
    this.todos = this.todos
      .map(item => {
        if (item.id === itemEl.getAttribute('data-id')) {
          item.isDone = isChecked;
        }
        return item; 
      });
    this._saveLS();
    this._paintChooser();
  }

  _handleModifyTitle (itemEl, titleEl) {
    titleEl.inactiveContenteditable();

    if (titleEl.innerText.length) {
      this.todos = this.todos
        .map(item => {
          if (item.id === itemEl.getAttribute('data-id')) {
            item.title = titleEl.innerText;
          }
          return item; 
        });
      this._saveLS();
    } else {
      titleEl.innerText = this.enterTitle;
    }
  }

  _activeFooter () {
    this.footerEl.classList.add('active');
  }

  _inactiveFooter () {
    this.footerEl.classList.remove('active');
  }

  _resizeListBox (comparedElHeight = 0) {
    const topHeight = document.querySelector('.top-row').offsetHeight;
    const bottomHeight = document.querySelector('.bottom-row').offsetHeight;
    const headerHeight = this.containerEl.querySelector('.todo-header').offsetHeight;
    const footerHeight = this.containerEl.querySelector('.todo-footer').offsetHeight;
    const maxHeight = window.innerHeight - (topHeight + bottomHeight + headerHeight + footerHeight);
    
    this.todoListEl.style.minHeight = null;
    this.todoListEl.style.maxHeight = null;
    
    const listElHeight = this.todoListEl.offsetHeight + 2;
    const elHeight = Math.max(listElHeight, comparedElHeight)
    const heightPx = `${elHeight > maxHeight ? maxHeight : elHeight}px`;

    this.todoListWrapperEl.style.minHeight = heightPx;
    this.todoListWrapperEl.style.maxHeight = heightPx;
    this.todoListEl.style.minHeight = heightPx;
    this.todoListEl.style.maxHeight = heightPx;
  }


}






    