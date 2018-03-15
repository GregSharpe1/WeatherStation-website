// Imports must come first
import React, { Component } from 'react';
import axios from 'axios';
import Chart from './components/Charts';

// Import the timestamp NPM module, 
// https://www.npmjs.com/package/react-timestamp
const Timestamp = require('react-timestamp');



class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            count: '',
            chartData:{},
        }
        this.loadWeatherInfo = this.loadWeatherInfo.bind(this);
    }

    getChartData() {
        // Make the API call here.

        // you need to pass in
        //  labels
        //  datasets
        //      label
        //      data
        //      backgroudcolour

        this.setState({
            chartData: {
            labels: ['Boston', 'Worchester', 'Spring', 'lowell', 'cam', 'new york'],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            13245,
                            43524,
                            23452,
                            23453,
                            34532,
                            24532
                        ],
                        // Here we'll set the colour of the bars
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ]
                    }
                ]
            }
        });
    }

    loadWeatherInfo() {
        // Attempt to match the location based upon URL input, else default to aber
        // TODO: Change the this.props.match to input from the USER from the CANVAS
        var location = this.props.match.params.location || 'aber'
        // Attempt to march the number of requests
        // TODO: Change the this.props.match to input from the USER from the CANVAS
        var count = this.props.match.params.count || 1
        // URL for the API
        var base_url = "https://api.gregsharpe.co.uk/weather/" + location + "/" + count;
        // Log the url attempted to reach
        console.log("URL attempted to hit: ", base_url)

        // Using axios https://github.com/axios/axios to get request
        axios.get(base_url)
        .then(res => {
            // log the result
            console.log("We've got the result: ", res.data.data)
            // debugging 
            console.log("Let's find the data; ", res.data.data.weather_data[0].payload.temperature_outdoor)
            this.setState({
                // This json path contains the weather information.
                data: res.data.data.weather_data,
                location: res.data.data.location,
                timestamp: res.data.data.timestamp,
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

    componentWillMount() {
        this.getChartData();
    }

    render() {
        // DEBUG: Log the data output
        console.log("Using this state, let's find the data: ", this.state.data)
        console.log("What's the count jeff? ", this.state.count)

        // If data exists
        if (this.state.data) {
            var weatherReadings = this.state.data.map(sensor => {
                // pre-process the timestamp in order to convert from UNix timestamp
                // Timestamp is taken in milliseconds. 
                var converted_time = sensor.timestamp / 1000;
                var converted_time = Math.round(converted_time)
                console.log(converted_time)
                // DEBUG
                console.log("Location!!!!: ", this.state.location)
    
                return (
                    
                        
                    <tr key = {sensor.timestamp}>
                    <td>
                    Weather Readings taken at: <b>{this.state.location}</b><br />
                    
                    Temperature Outdoor:  {sensor.payload.temperature_outdoor} <br /> 
                    Temperature Indoor:  {sensor.payload.temperature_indoor} <br />
                    Humidity Outdoor: {sensor.payload.humidity_outdoor} <br />
                    Humidity Indoor: {sensor.payload.humidity_indoor} <br />
                    Wind Direction: {sensor.payload.air_pressure} <br />
                    Wind Speed: {sensor.payload.wind_speed} <br />
                    Air Pressure: {sensor.payload.air_pressure} <br />
                    Rain Fall: {sensor.payload.rain_fall} <br />

                    Reading taken at: <b><Timestamp time={converted_time} format='full' includeDay /></b>

                    </td>
                    </tr>
                    
                )
            })
            // If data does not exist
        } else {
            weatherReadings = (
            <td> Cannot load data. </td>
            )
        }

        return (
        <table>
            <tbody>
                { weatherReadings }
                greg
           </tbody>
        </table>
        )
    }
}

export default WeatherApp;