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
        }

    }

    render() {
      console.log(this.state.value)
        return (
        <div>
          <center>
            Please enter a date, you wish to see the Weather Readings of.
          </center>
        </div>
        )
    }
}

export default PreviousWeather;
