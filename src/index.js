import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherApp from './WeatherApp';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

ReactDOM.render((
  <Router>
    <Route path="/:location?/:count?" component={WeatherApp}/>
  </Router>
), document.getElementById('root'));