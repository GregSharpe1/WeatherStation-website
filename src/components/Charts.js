import React, {Component} from 'react';
// Bring in the Charts you wish to use here!!!
import Line from 'react-chartjs-2';


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
          <div class="graphSection">
            <div class="container">
              <div class="row">
                <div class="col-sm-8 text-center">
                  <div class="graphBox">
                    <div className="chart">
                        <Line
                            data={this.state.chartData}
                            options={{
                                responsive: true,
                                title: {
                                    display: this.props.displayTitle,
                                    fontSize: this.props.titleFontSize,
                                },
                                legend: {
                                    display: this.props.displayLegend,
                                    position: this.props.legendPosition
                                },
                                maintainAspectRatio: true,
                                
                                }
                            }
                        />
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 chart-description">
                  <div className="graphInfo">
                    <h1><b> { this.props.titleText } </b></h1>
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
