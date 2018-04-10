import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import Home from './components/Home';
import CurrentWeather from './components/CurrentWeather';
import PreviousWeather from './components/PreviousWeather';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/current" component={CurrentWeather} />
    <Route path="/previous" component={PreviousWeather} />
  </Route>
);