// Imports must come first
import React, { Component } from 'react';
import axios from 'axios';
import Chart from './components/Charts';
import moment from 'moment';


class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            keys: [],
            location: '',
            sensor_descriptions: {
              "temperature_indoor": "Description: temperature_indoor",
              "humidity_outdoor": "Description: humidity_outdoor",
              "temperature_outdoor": "Description: temperature_outdoor",
              "humidity_indoor": "Description: humidity_indoor",
              "wind_speed": "Description: wind_speed",
              "air_pressure": "Description: air_pressure",
              "rain_fall": "Description: rain_fall"
            }

        }
        this.loadWeatherInfo = this.loadWeatherInfo.bind(this);
        this.createGraphs = this.createGraphs.bind(this);
    }

    static defaultProps = {
        defaultCountNumber: 48,
        defaultWeatherLocation: "aber",
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
            backgroundColor: 'rgb(139,195,74)',
          }
        ]
      }
      return chartData
    }

    loadWeatherInfo() {
        // Attempt to match the location based upon URL input, else default to aber
        // TODO: Change the this.props.match to input from the USER from the CANVAS
        var location = this.props.match.params.location || this.props.defaultWeatherLocation
        // Attempt to march the number of requests

        // TODO: Change the this.props.match to input from the USER from the CANVAS
        var count = this.props.match.params.count || this.props.defaultCountNumber
        // URL for the API
        var base_url = "https://api.gregsharpe.co.uk/weather/";

      	// Get Weather Data
      	axios.get(base_url + location + "/" + count)
      	.then(res => {
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
      
      console.log("TESTING CONVERT TITLE STRING FUNCTION: ", convertTitleText('temperature_indoor') )

        if(this.state.keys && this.state.data){
          console.log(this.state)
          var wx_graphs = this.state.keys.map(key => {
            var x_axis = []
            var y_axis = []

            for(var i = 0; i < this.state.data.data.weather_data.length; i++){
              x_axis.push(convertTimestamp(this.state.data.data.weather_data[i].timestamp));
              y_axis.push(this.state.data.data.weather_data[i].payload[key])
            }

            // Because the information is coming in newest first
            // and we want to display the data from oldest to newest
            x_axis.reverse()
            y_axis.reverse()

            if(key in this.state.sensor_descriptions){
              return (
                <tr key = {key}>
                  <td>
                    <Chart titleText={convertTitleText(key)} description={this.state.sensor_descriptions[key]} chartData={this.Chartdata(x_axis, y_axis)} />
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
        setInterval(this.loadWeatherInfo, 5000);
    }

    //Runs before first-time rendering, it's important that these run before rendering as to
    //prevent errors for the user.
    componentWillMount() {
      this.loadWeatherInfo();
      this.createGraphs();
    }

    render() {
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

function convertTimestamp(timestamp) {
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
  // Capitalize the first letter of each string.
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default WeatherApp;
