import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../assets/currentweather.css'


class CurrentWeather extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
        this.loadWeatherInfo = this.loadWeatherInfo.bind(this);
    }

    // Build an allowed location object
    // Implement a feature for the user to pick from the list
    

    loadWeatherInfo() {
        // Attempt to match the location based upon user input, else default to aber
        var location = this.state.location || 'aber'
        // URL for the API
        var base_url = "https://api.gregsharpe.co.uk/weather/" + location + "/" + 1;
        // Log the url attempted to reach
        console.log("URL attempted to hit: ", base_url)

        // Using axios https://github.com/axios/axios to get request
        axios.get(base_url)
        .then(res => {
            // log the result
            console.log("We've got the result: ", res.data.data)
            console.log("Let's find the data; ", res.data.data.weather_data[0].payload.temperature_outdoor)
            this.setState({
                // This json path contains the weather information.
                data: res.data.data.weather_data,
            });
        })
        // If cannot reach the URL for whatever reason, log the result.
        .catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.loadWeatherInfo();
        // Load the data every 30 minutes
        setInterval(this.loadWeatherInfo, 30000);
    }

    render() {
        // If there data exists
        console.log("Using this state, let's find the data: ", this.state.data)
        if (this.state.data) {
            var weatherReadings = this.state.data.map(sensor => {
                return (
                    <tr key = {sensor.timestamp}>
                      <div class="container">
                        <div class="row">
                          <div class="weather_widgets">
                            <ul>
                              <li>
                                <div class="widget_container">
                                  <h1>{getFeelsLikeTemp(sensor.payload.temperature_outdoor, sensor.payload.wind_speed, sensor.payload.humidity_outdoor)}<small>&#x2103;</small></h1>
                                  <h3>Feels Like</h3>
                                  <small>Time: {convertTimestamptoDate(sensor.timestamp)}</small>
                                </div>
                              </li>
                              <li>
                                <div class="widget_container">
                                  <h1>{sensor.payload.temperature_indoor}<small>&#x2103;</small></h1>
                                  <h3>Temperature Indoor</h3>
                                  <small>Time: {convertTimestamptoDate(sensor.timestamp)}</small>
                                </div>
                              </li>
                              <li>
                                <div class="widget_container">
                                  <h1>{sensor.payload.humidity_outdoor}<small>%</small></h1>
                                  <h3>Humidity Outdoor</h3>
                                  <small>Time: {convertTimestamptoDate(sensor.timestamp)}</small>
                                </div>
                              </li>
                              <li>
                                <div class="widget_container">
                                  <h1>{sensor.payload.temperature_outdoor}<small>&#x2103;</small></h1>
                                  <h3>Temperature Outdoor</h3>
                                  <small>Time: {convertTimestamptoDate(sensor.timestamp)}</small>
                                </div>
                              </li>
                              <li>
                                <div class="widget_container">
                                  <h1>{sensor.payload.humidity_indoor}<small>%</small></h1>
                                  <h3>Humidity Indoor</h3>
                                  <small>Time: {convertTimestamptoDate(sensor.timestamp)}</small>
                                </div>
                              </li>
                              <li>
                                <div class="widget_container">
                                  <h1>{sensor.payload.wind_speed}<small>m/s</small></h1>
                                  <h3>Wind Speed</h3>
                                  <small>Time: {convertTimestamptoDate(sensor.timestamp)}</small>
                                </div>
                              </li>
                              <li>
                                <div class="widget_container">
                                  <h1>{sensor.payload.wind_direction}</h1>
                                  <h3>Wind Direction</h3>
                                  <small>Time: {convertTimestamptoDate(sensor.timestamp)}</small>
                                </div>
                              </li>
                              <li>
                                <div class="widget_container">
                                  <h1>{sensor.payload.air_pressure}<small>hPa</small></h1>
                                  <h3>Air Pressure</h3>
                                  <small>Time: {convertTimestamptoDate(sensor.timestamp)}</small>
                                </div>
                              </li>
                              <li>
                                <div class="widget_container">
                                  <h1>{sensor.payload.rain_fall}<small>mm</small></h1>
                                  <h3>Rainfall</h3>
                                  <small>Time: {convertTimestamptoDate(sensor.timestamp)}</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </tr>
                )
            })
        } else {
            weatherReadings = (
            <td> Cannot load data </td>
            )
        }

        return (
        <table>
            <tbody>
                { weatherReadings }
           </tbody>
        </table>
        )
    }
}

function convertTimestamptoDate(timestamp) {
  // This function will return the timestamp in a human readable format

  // As the moment library doesn't run in milliseconds, convert the number first
  timestamp = timestamp / 1000;
  return moment.unix(timestamp).format('HH:mm:ss on DD/MM/YY')
}

function getFeelsLikeTemp(temperature, wind_speed, humidity){
  // to work out feels like temperature you need wind speed, temp, and relative humidity
  // An equation I have used from: https://gist.github.com/jfcarr/e68593c92c878257550d
  return Math.round(((0.6215*temperature) - 35.75*(wind_speed*0.16) + ((0.4275*temperature)*(wind_speed**0.16))) * 100) / 100
}


export default CurrentWeather;