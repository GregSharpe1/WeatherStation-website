import React, {Component} from 'react';
// Bring in the Charts you wish to use here!!!
import {Bar, Line, Pie} from 'react-chartjs-2';


// For options see:
// http://www.chartjs.org/docs/latest/
class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData: props.chartData
        }
    }

    static defaultProps = {
        displayTitle: true,
        titleText: 'Aberystwyth Sensor',
        titleFontSize: '25',
        displayLegend: false,
        legendPosition: 'right',
    }

    render() {
        return (
          <div id="graphSection">
            <div class="container">
              <div class="row">
                <div class="col-sm-8 text-center">
                  <div id="graphBox">
                    <div className="chart">
                        <Bar
                            data={this.state.chartData}
                            options={{
                                title: {
                                    display: this.props.displayTitle,
                                    text: this.props.titleText,
                                    fontSize: this.props.titleFontSize,
                                },
                                legend: {
                                    display: this.props.displayLegend,
                                    position: this.props.legendPosition
                                },
                                maintainAspectRatio: true
                            }}
                        />
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 text-center">
                  <div id="graphInfo">
                    { this.props.description }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default Chart;
