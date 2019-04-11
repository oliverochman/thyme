import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { getTimesheets } from "../modules/getData";
import { fetchProjects } from "../modules/timeData";

class DashboardChart extends Component {
	constructor(props) {
		super(props);
		// this.postTimesheets = this.postTimesheets.bind(this);
		this.state = {
			begin: "",
			end: "",
			projects: [],
			data: []
		};
	}

	componentDidMount() {
		this.getTimesheets();
	}

	async getTimesheets() {
		const projects = await fetchProjects();
	}

	render() {
		debugger;
		const data = {
			labels: ["Project 1", "Project 2", "Project 3"],
			datasets: [
				{
					label: "Projects",
					data: [this.state.projects],
					fill: false,
					borderColor: "green"
				}
			]
		};

		const options = {
			maintainAspectRatio: false
		};

		return (
			<div>
				<h1>Dashboard </h1>
				<div className="chart-data">
					<Line data={data} options={options} />
				</div>
			</div>
		);
	}
}

export default DashboardChart;
