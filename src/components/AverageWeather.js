import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../assets/currentweather.css'


class AverageWeather extends Component {
    constructor(props) {
        super(props);
        this.processAverages = this.processAverages.bind(this);
    
        this.state = { 
          last_data_received: [],
          averages: {}
        }
    }
  
  	processAverages(dataset){
        var count = dataset.length
        var keys = Object.keys(dataset[0].payload)
        var averages = {}
        
        for(var x=0; x<dataset.length; x++) {
        for(var y=0; y<keys.length; y++){
            if(keys[y] !== 'wind_direction'){
                if(averages[keys[y]]) {
                    averages[keys[y]] = averages[keys[y]] + parseFloat(dataset[x].payload[keys[y]])
                } else {
                    averages[keys[y]] = parseFloat(dataset[x].payload[keys[y]])
                }
            }
          }
        }
      
      	for(var i=0; i<keys.length; i++){
          averages[keys[i]] = Math.round((averages[keys[i]] / count) * 100) / 100
        }
      
      return averages
    }
  
    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.last_data_received) !== JSON.stringify(nextProps.data)) {
          if(nextProps.data.length > 0){
            this.setState({
                last_data_received: nextProps.data,
                averages: this.processAverages(nextProps.data)
            })
          } else {
            this.setState({
              last_data_received: [],
              averages: {}
            })
          }
        }
    } 

    render() {
        if (this.state.averages.temperature_indoor) {
        return (
        <table>
            <tbody>
                <tr key = '1' >
                  <div class="container">
                    <div class="average_weather header">
                      <p><b>Average Weather Readings:</b></p>
                    </div>
                    <div class="row">
                      <div class="average_weather weather_widgets">
                        <ul>
                          <li>
                            <div class="widget_container">
                              <h1>{this.state.averages.temperature_indoor}<small>&#x2103;</small></h1>
                              <h3>Temperature Indoor</h3>
                            </div>
                          </li>
                          <li>
                            <div class="widget_container">
                              <h1>{this.state.averages.humidity_outdoor}<small>%</small></h1>
                              <h3>Humidity Outdoor</h3>
                            </div>
                          </li>
                          <li>
                            <div class="widget_container">
                              <h1>{this.state.averages.temperature_outdoor}<small>&#x2103;</small></h1>
                              <h3>Temperature Outdoor</h3>
                            </div>
                          </li>
                          <li>
                            <div class="widget_container">
                              <h1>{this.state.averages.humidity_indoor}<small>%</small></h1>
                              <h3>Humidity Indoor</h3>
                            </div>
                          </li>
                          <li>
                            <div class="widget_container">
                              <h1>{this.state.averages.air_pressure}<small>hPa</small></h1>
                              <h3>Air Pressure</h3>
                            </div>
                          </li>
                          <li>
                            <div class="widget_container">
                              <h1>{this.state.averages.rain_fall}<small>mm</small></h1>
                            	<h3>Rainfall</h3>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </tr>
           </tbody>
        </table>
        )
    } else
    { return (
      <div class="alert alert-danger" role="alert">
        <div className='container'>
          <h4 class="alert-heading">Uh oh ...</h4>
          <p>
            <small>Looks like weather station data wasn't taken on that data.</small><br /><br /><b>Please try a new date</b>
          </p>
        </div>
      </div>
    )}
}}

export default AverageWeather;  