import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { getProjects } from "../modules/getProjects";
import { getTimesheets } from "../modules/getData";


class DashboardChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			user: "",
			projects: [],
			activities: []
		};
	}
	async componentDidMount() {
		const projectsResponse = await getProjects();
		const timesheetsResponse = await getTimesheets();

		const projects = projectsResponse.data;
		const timesheets = timesheetsResponse.data;
		debugger;

		timesheets= timesheets.map(time => {
			projects.filter(pro => {
				if (time.project === pro.id) {
					time.project = pro.name
				}
			})
			return time
		})

		let projectsDuration = []
		debugger;

		// let projectNames = [];
		// projects.forEach(element => {
		// 	projectNames.push(element.name);
		// });
		// this.setState({
		// 	data: {
		// 		labels: "user",
		// 		datasets: [
		// 			{
		// 				label: "projects",
		// 				data: projects,
		// 				backgroundColor: [
		// 					"rgba(255,105,145,0.6)",
		// 					"rgba(155,100,210,0.6)",
		// 					"rgba(90,178,255,0.6)",
		// 					"rgba(240,134,67,0.6)",
		// 					"rgba(120,120,120,0.6)",
		// 					"rgba(250,55,197,0.6)"
		// 				]
		// 			}
		// 		]
		// 	}
		// });
	}

	render() {
		return (
			<div>
				<h1>Dashboard </h1>
				<div className="chart-data">
					<Bar
						data={this.state.Data}
						options={{ maintainAspectRatio: false }}
					/>
				</div>
			</div>
		);
	}
}

export default DashboardChart;


// filter projects to get the only ones that are listed in the collection of timesheets

// then we have projects that are only relavent for current user

// then we want to get duration of each timesheet containing the project id

// where project name is the same, we want to add their durations together the