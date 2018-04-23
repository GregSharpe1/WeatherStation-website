// Imports must come first
import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Charts';
import moment from 'moment';
import '../assets/previousweather.css'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import AverageWeather from './AverageWeather';


// PreviousWeather
// Child -> DatePicker
// Return the 'DatePicker's startDate state'
class PreviousWeather extends Component {
    constructor(props) {
        super(props);
      	var now = moment()
        this.state = {
          data: [],
          selected_date: "",
          start_timestamp: now.startOf('day').valueOf(),
          end_timestamp: now.endOf('day').valueOf()
        };
      	this.handleSelectDate = this.handleSelectDate.bind(this);
    }
  
  	handleSelectDate(date) {
      //valueOf provides the AWS compliant timestamp.
      //.startOf allows us to find the start of the date selected.
      var start_timestamp = date.startOf('day').valueOf()
      //.endOf allows us to find the start of the date selected.
      var end_timestamp = date.endOf('day').valueOf()
      
      this.setState({
        selected_date: date,
        start_timestamp: start_timestamp,
        end_timestamp: end_timestamp
      })
      
			//Prepare API Call
      var location = "aber" || this.state.location;
      var base_url  = "https://api.gregsharpe.co.uk/weather/history/" + location + "/" + start_timestamp + "/" + end_timestamp;
      console.log('Base URL: ', base_url);

      axios.get(base_url)
      .then(res => {
        this.setState({
          data: res.data.data.weather_data,
        })
      })
      // error handling
      .catch(err => {
        console.log(err);
      });
    }

    render() {

      if (!this.state.selected_date == "") {
        return (
          <div>
            <center>
              Please enter a date, you wish to see the Weather Readings of.
              <DatePicker
                onSelect={this.state.start_date}
                onChange={this.handleSelectDate}
              />
            <h1>Previous Weather for: {moment(this.state.start_timestamp).format("DD MMM YYYY")}</h1>
            <div>
              <h2>Average Weather</h2>
              <AverageWeather data={this.state.data} />
            </div>
          </center>
        </div>
        )
    } else {
      return (
        <div>
          <center>
            Please enter a date, you wish to see the Weather Readings of.
            <DatePicker
              onSelect={this.state.start_date}
              onChange={this.handleSelectDate}
              maxDate={moment()}
            />
          </center>
        </div>
      )
    } 
  }
}

export default PreviousWeather;