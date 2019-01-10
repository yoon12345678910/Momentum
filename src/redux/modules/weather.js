import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender  } from 'redux-pender';
import moment from 'moment';
import * as weatherAPI from 'lib/api/weather';

// action types
const GET_CURRENT_WEATHER = 'weather/GET_CURRENT_WEATHER';
const GET_WEATHER_FORECAST = 'weather/GET_WEATHER_FORECAST';
const TOGGLE_DASHBOARD = 'weather/TOGGLE_DASHBOARD';
const SET_LOCATION_NAME = 'weather/SET_LOCATION_NAME';
const CLEAR_LOCATION_NOTI = 'weather/CLEAR_LOCATION_NOTI';
const FOCUS_LOCATION_NAME = 'weather/FOCUS_LOCATION_NAME';
const BLUR_LOCATION_NAME = 'weather/BLUR_LOCATION_NAME';
const SHOW_FORECAST_DAY = 'weather/SHOW_FORECAST_DAY';

// action creator
export const getCurrentWeather = createAction(GET_CURRENT_WEATHER, weatherAPI.getCurrentWeather);
export const getWeatherForecast = createAction(GET_WEATHER_FORECAST, weatherAPI.getWeatherForecast);
export const toggleDashboard = createAction(TOGGLE_DASHBOARD);
export const setLocationName = createAction(SET_LOCATION_NAME);
export const clearLocationNoti = createAction(CLEAR_LOCATION_NOTI);
export const focusLocationName = createAction(FOCUS_LOCATION_NAME);
export const blurLocationName = createAction(BLUR_LOCATION_NAME);
export const showForecastDay = createAction(SHOW_FORECAST_DAY);

// parse weather data
const WEEKS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const weatherDataParser = (raw) => {
  const timestamp = raw.dt * 1000;
  const d = moment(timestamp);
  return {
    dt: timestamp,
    date: parseInt(d.format('YYYYMMDD')),
    hours: parseInt(d.format('H')),
    day: WEEKS[d.day()],
    temp: raw.main.temp,
    tempMin: raw.main.temp_min,
    tempMax: raw.main.temp_max,
    pressure: raw.main.pressure,
    humidity: raw.main.humidity,
    ...raw.weather[0],
    wind: raw.wind
  }
};

// initial state
const initialState = Map({
  isVisiblePopup: false,
  isFocusedLocationName: false,
  isTodaySelected: true,
  selectedDate: -1,
  currentWeather: Map({
    status: 'INIT',
    data: Map({})
  }),
  weatherForecast: Map({
    status: 'INIT',
    data: Map({})
  }),
  detailedWeather: Map({}),
  locationName: '',
  foundLocationName: '',
  locationNoti: ''
});

// reducer
export default handleActions({
  ...pender({
    type: GET_CURRENT_WEATHER,
    onPending: (state) => {
      return state.setIn(['currentWeather', 'status'], 'WAITING');
    },
    onFailure: (state) => {
      return state.setIn(['currentWeather', 'status'], 'FAILURE')
                  .set('locationName', state.get('foundLocationName'))
                  .set('locationNoti', `${state.get('locationName')} not found`);
    },
    onSuccess: (state, action) => {
      const { data } = action.payload;
      const parsedData = weatherDataParser(data);
      const locationName = `${data.name}, ${data.sys.country}`;
      weatherAPI.saveLocalStorage({
        ...data.coord,
        locationName
      });
      return state.setIn(['currentWeather', 'status'], 'SUCCESS')
                  .setIn(['currentWeather', 'data'], Map(parsedData))
                  .set('detailedWeather', Map(parsedData))
                  .set('isTodaySelected', true)
                  .set('selectedDate', -1)
                  .set('locationName', locationName)
                  .set('foundLocationName', locationName)
                  .set('locationNoti', '');
    }
  }),
  ...pender({
    type: GET_WEATHER_FORECAST,
    onPending: (state) => {
      return state.setIn(['weatherForecast', 'status'], 'WAITING');
    },
    onFailure: (state) => {
      return state.setIn(['weatherForecast', 'status'], 'FAILURE');
    },
    onSuccess: (state, action) => {
      const { data } = action.payload;
      const parsedData = data.list
        .map(d => weatherDataParser(d))
        .filter(d => {
          const today = parseInt(moment().format('YYYYMMDD'));
          // 오늘을 제외한 4일치 일기예보
          return d.date !== today && d.date <= today + 4; 
        })
        .reduce((acc, d) => {
          let item = acc[d.date] || d;
          if (d.hours >= 12 && d.hours <= 18) { // 기준시간
            item = d;
          }
          item.tempMax = Math.max(item.tempMax, d.tempMax);
          item.tempMin = Math.min(item.tempMin, d.tempMin);
          acc[d.date] = item;
          return acc;
        }, {});
      return state.setIn(['weatherForecast', 'status'], 'SUCCESS')
                  .setIn(['weatherForecast', 'data'], Map(parsedData));
    }
  }),
  [TOGGLE_DASHBOARD]: (state) => {
    return state.set('isVisiblePopup', !state.get('isVisiblePopup'));
  },
  [SET_LOCATION_NAME]: (state, action) => {
    return state.set('locationName', action.payload.locationName);
  },
  [CLEAR_LOCATION_NOTI]: (state) => {
    return state.set('locationNoti', '')
                .setIn(['currentWeather', 'status'], 'SUCCESS')
                .setIn(['weatherForecast', 'status'], 'SUCCESS');
  },
  [FOCUS_LOCATION_NAME]: (state) => {
    return state.set('isFocusedLocationName', true);
  },
  [BLUR_LOCATION_NAME]: (state) => {
    return state.set('isFocusedLocationName', false);
  },
  [SHOW_FORECAST_DAY]: (state, action) => {
    const currentWeatherJS = state.getIn(['currentWeather', 'data']).toJS();
    const weatherForecastJS = state.getIn(['weatherForecast', 'data']).toJS();
    let detailedWeather = null;
    let isTodaySelected = true;
    let selectedDate = action.payload.selectedDate;

    if (selectedDate === state.get('selectedDate')) {
      detailedWeather = currentWeatherJS;
      selectedDate = -1;
    } else if (selectedDate === currentWeatherJS.date) {
      detailedWeather = currentWeatherJS;
    } else {
      detailedWeather = weatherForecastJS[selectedDate];
      isTodaySelected = false;
    }

    return state.set('detailedWeather', Map(detailedWeather))
                .set('selectedDate', selectedDate)
                .set('isTodaySelected', isTodaySelected);
  }
}, initialState);
