// Imports must come first
import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Charts';
import moment from 'moment';
import '../assets/previousweather.css'

class PreviousWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            keys: [],
            location: '',
            count: '',
            sensor_descriptions: {
              "temperature_indoor": "This temperature reading are read from a BME280 within the labs at Aberystwyth University and is measured in degree celsius",
              "humidity_outdoor": "The outside humidity readings are taken from a DHT22 located on top of the Aberystywyth University computer science building.",
              "temperature_outdoor": "The outdoor temperature readings are again measured in degrees celsuis, with a DS18B20 sensor. This sensor is also locted on top of Aberystwyth UNiversity building.",
              "humidity_indoor": "Humidity indoor reading is taken from a BME280, located inside Aberystwyth's University Computer Science building.",
              "wind_speed": "Wind speed reading are taken from a standard anemometer like device, measure in metres per second located on top of Aberstwyth's University building.",
              "air_pressure": "Air Pressure readings are taken from a BME280 device, located on top of Aberystwyth Univeristy buildng.",
              "rain_fall": "Rain fall is measured using a standard rain gauge, and is measured using a seasaw type device.",
            }

        }

        this.handleChange = this.handleChange.bind(this);
        this.loadWeatherInfo = this.loadWeatherInfo.bind(this);
        this.createGraphs = this.createGraphs.bind(this);
    }

    static defaultProps = {
        defaultCountNumber: 48,
        defaultWeatherLocation: "aber",
    }

    // Here will be setting the state via user input
    handleChange(event) {
      this.setState({count: parseInt(event.target.value)});
      console.log("COUNT NUMBER: ", this.state.count)
      this.componentWillMount(this.props);
      this.loadWeatherInfo()
      this.createGraphs()
    }

    Chartdata(labels, dataset) {
      var chartData = {
        // Labels will be each time a reading is taken.
        labels: labels,
        datasets: [
          {
            label: this.state.location,
            data: dataset,
            // Here we'll set the colour of the bars
            backgroundColor: 'rgb(44,62,80)',
          }
        ]
      }
      return chartData
    }

    loadWeatherInfo() {
        // Attempt to match the location based upon URL input, else default to aber
        // TODO: Change the this.props.match to input from the USER from the CANVAS
        var location = this.props.defaultWeatherLocation
        // Attempt to march the number of requests

        // TODO: Change the this.props.match to input from the USER from the CANVAS
        var count =  this.props.defaultCountNumber
        // URL for the API
        var base_url = "https://api.gregsharpe.co.uk/weather/" + location + "/" + count
      	// Get Weather Data
        axios.get(base_url)
      	.then(res => {
          console.log("BASE URL: ", base_url)
          var keys = Object.keys(res.data.data.weather_data[0].payload)

          this.setState({
              data: res.data,
              keys: keys,
              location: location
          })
        })
      	.catch(err => {
          console.log(err);
        })
    }

		createGraphs() {
      

        if(this.state.keys && this.state.data){
          var wx_graphs = this.state.keys.map(key => {
            var x_axis = []
            var y_axis = []

            for(var i = 0; i < this.state.data.data.weather_data.length; i++){
              // Set the value of -50.00 for wind_speed to zero (FOR NOW)
              if(key==="wind_speed"){
                // This is temporary
                if(this.state.data.data.weather_data[i].payload[key] === "-50.00") {
                  x_axis.push(convertTimestamptoDate(this.state.data.data.weather_data[i].timestamp));
                  y_axis.push("0.00")
                } else {
                  x_axis.push(convertTimestamptoDate(this.state.data.data.weather_data[i].timestamp));
                  y_axis.push(this.state.data.data.weather_data[i].payload[key])
                }
              } else {
              x_axis.push(convertTimestamptoDate(this.state.data.data.weather_data[i].timestamp));
              y_axis.push(this.state.data.data.weather_data[i].payload[key])
              }
            }

            // Because the information is coming in newest first
            // and we want to display the data from oldest to newest
            x_axis.reverse()
            y_axis.reverse()
            if(key in this.state.sensor_descriptions){
              return (
                <tr key = {key}>
                  <td>
                    <Chart titleText={convertTitleText(key)} description={this.state.sensor_descriptions[key]} chartData={this.Chartdata(x_axis, y_axis)}/>
                  </td>
                </tr>
              )
            } else {
              return (null)
            }
          })
    
        } else {
          wx_graphs = (
            <tr>
              <td>
                <p>Cannot Load Data!</p>
              </td>
            </tr>
          )
        }


      	return wx_graphs

    }

    componentDidMount() {
        this.loadWeatherInfo();
        this.createGraphs();
        // Load the data every 30 minutes
        setInterval(this.loadWeatherInfo, 50000);
    }

    //Runs before first-time rendering, it's important that these run before rendering as to
    //prevent errors for the user.
    componentWillMount() {
      this.loadWeatherInfo();
      this.createGraphs();
    }

    render() {
      console.log(this.state.data)
        return (
        <div>
          <table>
              <tbody>
                  { this.createGraphs() }
             </tbody>
          </table>
        </div>
        )
    }
}

function convertTimestamptoDate(timestamp) {
    // This function will return the timestamp in a human readable format

    // As the moment library doesn't run in milliseconds, convert the number first
    timestamp = timestamp / 1000;
    return moment.unix(timestamp).format('DD/MM/YY HH:mm:ss')
}

function convertTitleText(str){
  // This function will take input for the Graph title
  // convert from temperature_indoor to Temperature Indoor
  // Makes it look better :)

  // Replace the under score with a space
  str = str.replace('_', ' ')
  // Capitalize the first letter of each string.`
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getFeelsLikeTemp(temperature, wind_speed, humidity){
  // to work out feels like temperature you need wind speed, temp, and relative humidity
  // An equation I have used from: https://gist.github.com/jfcarr/e68593c92c878257550d
  return 35.74 + (0.6215*temperature) - 35.75*(wind_speed*0.16) + ((0.4275*temperature)*(wind_speed**0.16))
}

export default PreviousWeather;
