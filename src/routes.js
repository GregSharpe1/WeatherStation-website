import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import Home from './components/Home';
import CurrentWeather from './components/CurrentWeather';
import Last24Hours from './components/Last24Hours';
import PreviousWeather from './components/PreviousWeather';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/current" component={CurrentWeather} />
    <Route path="/last24hours" component={Last24Hours} />
    <Route path="/previous" component={PreviousWeather} />
  </Route>
);