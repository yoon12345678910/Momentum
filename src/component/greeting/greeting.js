export default class {
  constructor() {
    this.LS_KEY = 'user';
    this.GREETING = {
      MORNING: 'Good morning',
      AFTERNOON: 'Good afternoon',
      EVENING: 'Good evening'
    };
    this.containerEl = document.querySelector('#greeting');
    this.messageEl = this.containerEl.querySelector('.message');
    this.nameEl = this.containerEl.querySelector('.name');
    this.enterName = '';
    this.randomName = ['lovely', 'good looking', 'sexy', 'rockstar', 'gorgeous', 'friends', 'pal', 'superstar'];
  }

  init() {
    this._loadLS();
    this._askForName();
    this.paintGreeting();
  }

  paintGreeting() {
    const date = new Date();
    const hours = date.getHours();
    let text;
    
    if (hours >= 5 && hours < 12) {
      text = this.GREETING.MORNING;
    } else if (hours >= 12 && hours < 17) {
      text = this.GREETING.AFTERNOON;
    } else {
      text = this.GREETING.EVENING;
    }
  
    this.messageEl.innerText = `${text}, `;
  }

  _askForName() {
    this.nameEl.addEventListener('keydown', function (e) {
      const keyCode = e.keyCode ? e.keyCode : e.which;
      if (keyCode === 13) {
        e.preventDefault();
        this.blur();
      }
    });
  
    this.nameEl.addEventListener('dblclick', function () {
      this.nameEl.classList.add('editing');
      this.nameEl.animateCss('pulse'); 
      this.nameEl.setAttribute('contenteditable', true);
      this.nameEl.setEndOfContenteditable();
      this.enterName = this.nameEl.innerText;
    }.bind(this));
  
    this.nameEl.addEventListener('focusout', function () {
      this.nameEl.classList.remove('editing');
      this.nameEl.animateCss('pulse');
      this.nameEl.setAttribute('contenteditable', false);
    
      if (this.nameEl.innerText.length) {
        this._saveLS();
      } else {
        this.nameEl.innerText = this.enterName;
      }
    }.bind(this));
  }

  _saveLS() {
    localStorage.setItem(this.LS_KEY, this.nameEl.innerText);
  }

  _loadLS() {
    const currentUser = localStorage.getItem(this.LS_KEY);
    if (currentUser === null) {
      this.enterName = this.randomName[Math.floor(Math.random() * this.randomName.length)];
      this.nameEl.innerText = this.enterName;
    } else {
      this.enterName = currentUser;
      this.nameEl.innerText = currentUser;
    }
  }
}
