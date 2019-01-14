import axios from 'axios';

const API = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '4514b9d5bb75f12330b26b56f8731058';
const LS_KEY = 'weather';

const generateSearchQuery = ({ lat, lon, locationName }) => {
  if (typeof locationName !== 'undefined') {
    return `q=${locationName}`;
  } else {
    return `lat=${lat}&lon=${lon}`;
  }
};

export const getCurrentWeather = (...req) => {
  return axios.get(`${API}weather?${generateSearchQuery(...req)}&appid=${API_KEY}&units=metric&lang=kr`);
};

// 5일간의 일기예보, 3시간 간격(15,18,21...)
export const getWeatherForecast = (...req) => {
  return axios.get(`${API}forecast?${generateSearchQuery(...req)}&appid=${API_KEY}&units=metric&lang=kr`);
}

export const loadLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LS_KEY));
};

export const saveLocalStorage = ({ lat, lon, locationName }) => {
  localStorage.setItem(LS_KEY, JSON.stringify({ lat, lon, locationName }));
};