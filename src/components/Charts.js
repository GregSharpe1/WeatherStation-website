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
        titleFontSize: '25',
        displayLegend: true,
        legendPosition: 'right',
    }

    render() {
        return (
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Largest Cities',
                            fontSize: this.props.titleFontSize,
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        },
                        maintainAspectRatio: true,
                        width:'200',
                        height:'50'
                    }}
                />
            </div>
        )
    }
}

export default Chart;