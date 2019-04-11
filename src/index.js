require('./reset.css');
require('./font.css');
require('./index.css');

import utils from './utils/utils';
import BackgroundClass from './component/background/background';
import ClockClass from './component/clock/clock';
import GreetingClass from './component/greeting/greeting';
import WeatherClass from './component/weather/weather';
import TodoClass from './component/todo/todo';

const Background = new BackgroundClass();
const Clock = new ClockClass();
const Greeting =  new GreetingClass();
const Weather = new WeatherClass();
const Todo = new TodoClass();

Background.init();
Clock.init();
Greeting.init();
Weather.init();
Todo.init();