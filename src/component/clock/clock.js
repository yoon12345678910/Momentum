export default class {
  constructor() {
    this.LS_KEY = 'hour12clock';
    this.hour12clock = false;
    this.containerEl = document.querySelector('#clock');
    this.timeEl = this.containerEl.querySelector('.time');
    this.formatEl = this.containerEl.querySelector('.format');
  }

  init() {
    this._loadLS();
    this.setTime();
    setInterval(this.setTime.bind(this), 1000);
    this.timeEl.addEventListener('dblclick', this._changeHourFormat.bind(this));
  }

  setTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    if (this.hour12clock) {
      this.timeEl.innerText = `${hours % 12 || 12}:${minutes.padLeft()}:${seconds.padLeft()}`;
    } else {
      this.timeEl.innerText = `${hours.padLeft()}:${minutes.padLeft()}:${seconds.padLeft()}`;
    }

    this.formatEl.innerText = hours >= 12 ? 'PM' : 'AM';
  }

  _changeHourFormat() {
    if (this.hour12clock) {
      this.hour12clock = false;
      this.formatEl.classList.remove('show');
    } else {
      this.hour12clock = true;
      this.formatEl.classList.add('show');
    }

    this._saveLS();
    this.setTime();
  }
  
  _loadLS() {
    const currentHour12clock = JSON.parse(localStorage.getItem(this.LS_KEY));

    if (currentHour12clock === null) {
      this._saveLS();
    } else {
      this.hour12clock = currentHour12clock;
    }
  }

  _saveLS() {
    localStorage.setItem(this.LS_KEY, this.hour12clock);
  }
}
