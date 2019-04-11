export default class {
  constructor() {
    this.LS_KEY = 'weather';
    this.API_KEY = '4514b9d5bb75f12330b26b56f8731058';
    this.API_TYPE_KEY = {
      COORDS: 'coords',
      CITY: 'cidy'
    };
    this.ICON = { // icon mapping (openweathermap{d:day,n:night} : meteocons)
      '01d': 'B',   '01n': '2', // clear sky
      '02d': 'H',   '02n': '4', // few clouds
      '03d': 'N',   '03n': '5', // scattered clouds
      '04d': 'Y',   '04n': '%', // broken clouds
      '09d': 'T',   '09n': '!', // shower rain
      '10d': 'R',   '10n': '8', // rain
      '11d': '0',   '11n': '&', // thunderstorm
      '13d': 'W',   '13n': '#', // snow
      '50d': 'M',   '50n': 'M'  // mist
    };
    this.WEEKS = new Array('Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursdasy', 'Friday', 'Saturday');
    this.containerEl = document.querySelector('#weather')
    this.dashEl = this.containerEl.querySelector('.widget-dash'),
    this.dashIconEl = this.dashEl.querySelector('.icon-weather'),
    this.dashTempEl = this.dashEl.querySelector('.weather-temp'),
    this.dashLocationEl = this.dashEl.querySelector('.location-name'),
    this.wrapperEl = this.containerEl.querySelector('.widget-wrapper'),
    this.currentEl = this.wrapperEl.querySelector('.weather-current'),
    this.currentIconEl = this.currentEl.querySelector('.icon-weather'),
    this.currentTempEl = this.currentEl.querySelector('.weather-temp'),
    this.currentLocationEl = this.currentEl.querySelector('.location-name'),
    this.conditionsEl = this.wrapperEl.querySelector('.weather-conditions'),
    this.forecastEl = this.wrapperEl.querySelector('.weather-forecast');
    this.enterCity = '';
    this.activeWidgetWrapper = false;
    this.onToggleWidgetWrapper;
    this.defaultData = {};
    this.weatherData = {};
    this.forecastData = {};
  }

  init() {
    this._loadLS();

    this.dashEl.addEventListener('click', this._handleToggleWidgetWrapper.bind(this));
  
    this.currentLocationEl.addEventListener('keydown', function (e) {
      const keyCode = e.keyCode ? e.keyCode : e.which;
      if (keyCode === 13) {
        e.preventDefault();
        this.blur();
      }
    });
  
    this.currentLocationEl.addEventListener('dblclick', function () {
      this.currentLocationEl.activeContenteditable();
      this.enterCity = this.currentLocationEl.innerText;
    }.bind(this));
  
    this.currentLocationEl.addEventListener('focusout', function (e) {
      this._handleSearchInput();
    }.bind(this));
  }

  _handleToggleWidgetWrapper (e) {
    const changeDisplay = () => {
      this.activeWidgetWrapper = this.activeWidgetWrapper ? false : true;
      this.containerEl.classList.toggle('show');  
      this.wrapperEl.classList.toggle('show-fade-in');
    }

    const outsideClickListener = (e) => {
      if (this.dashEl.contains(e.target)) return;
      if (!this.wrapperEl.contains(e.target)) {
        changeDisplay();
        removeClickListener();
      }
    }

    const removeClickListener = () => {
      document.removeEventListener('click', this.onToggleWidgetWrapper);
    }

    changeDisplay();

    if (this.activeWidgetWrapper) {
      this.onToggleWidgetWrapper = outsideClickListener.bind(this);
      document.addEventListener('click', this.onToggleWidgetWrapper);
    } else {
      removeClickListener();
    }
  }


  _mappingWeaterObj (obj) {
    const timestamp = obj.dt * 1000;
    const date = new Date(timestamp);
    return  {
      dt: timestamp,
      dd: date.getDay(),
      dt_txt: (() => {
        return [date.getFullYear(),
          (date.getMonth() + 1).padLeft(),
          date.getDate().padLeft()].join('-')
        + ' ' + 
        [date.getHours().padLeft(),
          date.getMinutes().padLeft(),
          date.getSeconds().padLeft()].join(':');
      })(),
      temp: Math.floor(obj.main.temp),
      temp_min: Math.floor(obj.main.temp_min),
      temp_max: Math.floor(obj.main.temp_max),
      pressure: obj.main.pressure,
      humidity: obj.main.humidity,
      weather: obj.weather[0],
      wind: obj.wind
    }
  }

  _getCurrentWeather (weatherObj) {
    const searchKeyword = `${weatherObj.key === this.API_TYPE_KEY.CITY ?`q=${weatherObj.data.name}` : `lat=${weatherObj.data.lat}&lon=${weatherObj.data.lng}`}`;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?${searchKeyword}&appid=${this.API_KEY}&units=metric&lang=kr`
    ).then(function(response) {
      return response.json()
    }).then(function(json) {
      this.weatherData = this._mappingWeaterObj(json);
      this.defaultData.city = json.name;
      this.defaultData.country = json.sys.country;
  
      this.dashEl.title = this.weatherData.weather.main;
      this.dashIconEl.dataset.icon = this.ICON[this.weatherData.weather.icon];
      this.dashTempEl.innerText = `${this.weatherData.temp}°`;
      this.dashLocationEl.innerText = `${this.defaultData.city}, ${this.defaultData.country}`;
      this.currentIconEl.title = this.weatherData.weather.main;
      this.currentIconEl.dataset.icon = this.ICON[this.weatherData.weather.icon];
      this.currentTempEl.innerText = `${this.weatherData.temp}°`;
      this.currentLocationEl.innerText = `${this.defaultData.city}, ${this.defaultData.country}`;
      this.conditionsEl.innerText = this.weatherData.weather.main;;
  
      this.enterCity = weatherObj.data.name;
      this._saveLS(weatherObj);
    }.bind(this)).catch(function(error) {
      this.currentLocationEl.innerText = this.enterCity;
      console.error('getCurrentWeather: ' + error.message);
    }.bind(this));
  }
  
  _getForecast(weatherObj) {
    this.forecastEl.classList.remove('show');

    const searchKeyword = `${weatherObj.key === this.API_TYPE_KEY.CITY ?`q=${weatherObj.data.name}` : `lat=${weatherObj.data.lat}&lon=${weatherObj.data.lng}`}`;
    const cnt = (() => {
      const REQUEST_MAX_CNT = 39;
      return REQUEST_MAX_CNT - Math.floor(new Date().getHours() / 3);
    })()

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${searchKeyword}&appid=${this.API_KEY}&units=metric&lang=kr&cnt=${cnt}`
    ).then(function(response) {
      return response.json()
    }).then(function(json) {
      const DISPLAY_TIME_1 = 12;
      const DISPLAY_TIME_2 = 15;

      this.forecastData = json.list
        .map((f) => this._mappingWeaterObj(f))
        .filter((f,i ) => {
          return new Date().getDay() !== new Date(f.dt).getDay()
        })
        .reduce((acc, f) => {
          const d = new Date(f.dt);
          const fHours = d.getHours();
          const fDate = f.dt_txt.split(' ')[0];
          if (!acc[`${fDate}`] || fHours === DISPLAY_TIME_1 || fHours === DISPLAY_TIME_2) {
            acc[`${fDate}`] = f;
          }
          const o = acc[`${fDate}`];
          o.temp_min = Math.min(o.temp, f.temp);
          o.temp_max = Math.max(o.temp, f.temp);
          return acc;
        }, {});

      while (this.forecastEl.hasChildNodes()) {
        this.forecastEl.removeChild(this.forecastEl.firstChild); 
      }
  
      for (const [key, item] of Object.entries(this.forecastData)) {
        const fItem = document.createElement('div');
        const fLabel = document.createElement('div');
        const fIcon = document.createElement('span');
        const fHigh = document.createElement('span');
        const fLow = document.createElement('span');

        fItem.classList.add('weather-forecast-item');
        fLabel.classList.add('weather-forecast-label');
        fIcon.classList.add('icon', 'icon-weather');
        fHigh.classList.add('weather-forecast-high');
        fLow.classList.add('weather-forecast-low');

        fItem.setAttribute('data-day', key);
        fItem.title = item.weather.main;
        fLabel.innerText = this.WEEKS[item.dd];
        fIcon.dataset.icon = this.ICON[item.weather.icon];
        fHigh.innerText = `${item.temp_max}°`;
        fLow.innerText = `${item.temp_min}°`;

        fItem.appendChild(fLabel);
        fItem.appendChild(fIcon);
        fItem.appendChild(fHigh);
        fItem.appendChild(fLow);
        this.forecastEl.appendChild(fItem);
      }

      this.forecastEl.classList.add('show');
    }.bind(this)).catch(function(error) {
      console.error('getForecast: ' + error.message);
    }.bind(this));
  }
  
  _handleSearchInput() {
    const currentValue = this.currentLocationEl.innerText.replace(/\s/gi, '');
    const weatherObj = {
      key: this.API_TYPE_KEY.CITY,
      data: {
        name: currentValue
      }
    };
  
    if (currentValue === this.enterCity.replace(/\s/gi, '')) return;

    this.currentLocationEl.inactiveContenteditable();
  
    if (currentValue.length) {
      this._getCurrentWeather(weatherObj);
      this._getForecast(weatherObj);
    } else {
      this.currentLocationEl.innerText = this.enterCity;
    }
  }

  _askForCoords() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const weatherObj = {
          key: this.API_TYPE_KEY.COORDS,
          data: {
            lat,
            lng
          }
        };
      
        this._saveLS(weatherObj);
        this._getCurrentWeather(weatherObj);
        this._getForecast(weatherObj);
      }.bind(this),
      function () {
        console.error('Cant access geo location');
      }
    );
  }

  _loadLS() {
    const loadedCoords= localStorage.getItem(this.LS_KEY);

    if (loadedCoords === null) {
      this._askForCoords();
    } else {
      const parseData = JSON.parse(loadedCoords);
      this._getCurrentWeather(parseData);
      this._getForecast(parseData);
    }
  }

  _saveLS(weatherObj) {
    localStorage.setItem(this.LS_KEY, JSON.stringify(weatherObj));
  }
}
