import React, { Component } from 'react';
import axios from 'axios';

class CurrentWeather extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
        this.loadWeatherInfo = this.loadWeatherInfo.bind(this);
    }

    loadWeatherInfo() {
        // Attempt to match the location based upon URL input, else default to aber
        var location = 'aber'
        // Attempt to march the number of requests
        var count = 1
        // URL for the API
        var base_url = "https://api.gregsharpe.co.uk/weather/" + location + "/" + count;
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
                location: res.data.data.location
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
                    <table>
                    <tr>
                      <td>Temperature Outdoor: {sensor.payload.temperature_outdoor}</td>
                    </tr>
                    <tr>
                      <td>Temperature Indoor: {sensor.payload.temperature_indoor}</td>
                    </tr>
                    <tr>
                      <td>Humidity Outdoor:  {sensor.payload.humidity_outdoor}</td>
                    </tr>
                    <tr>
                      <td>Humidity Indoor: {sensor.payload.humidity_indoor}</td>
                    </tr>
                    <tr>
                      <td>Rain Fall: {sensor.payload.rain_fall}</td>
                    </tr>
                    <tr>
                      <td>Wind Direction: {sensor.payload.wind_direction}</td>
                    </tr>
                    <tr>
                      <td>Wind Speed: {sensor.payload.wind_speed}</td>
                    </tr>
                    
                    </table>
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

export default CurrentWeather;