import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

class DashboardChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			begin: '',
			end: '',
			projects: []
		}
	}



	render() {
		const data = {
			labels: [
        'some random label',
			],
			datasets: [
        {
          label: 'Projects',
          data: [22, 19, 27],
          fill: false,
          borderColor: 'blue'
        }
      ]
		}

		const options = {
      maintainAspectRatio: false
		}

		return (
			<div>
				<h1>It works</h1>
				<div className="chart-data">
				<Line data={data} options={options}/>
				</div>
			</div>
		);
	}
}

export default DashboardChart;
