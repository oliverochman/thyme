import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { getProjects } from "../modules/getProjects";
import { getTimesheets } from "../modules/getData";
import { Dropdown } from "semantic-ui-react";



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

	async doughnutLogic(month) {
		const projectsResponse = await getProjects();
		const timesheetsResponse = await getTimesheets();

		const projects = projectsResponse.data;
		const timesheets = timesheetsResponse.data;

		const filtredTimesheets = timesheets.filter(asd => asd.begin > month).map(time => {
			let index = projects.findIndex(project => project.id === time.project)
			let project = projects[index]
			time.project = project.name
			return time
		})

		const onlyProjectNames = filtredTimesheets.map(val => {
			return {projectName: val.project}
		})

		const uniqueProjects = onlyProjectNames.filter((project,index) => {
			return index === onlyProjectNames.findIndex(obj => {
				return JSON.stringify(obj) === JSON.stringify(project);
			});
		});

		timesheets.map(time => {
			uniqueProjects.map(project => {
				if (project.projectName === time.project) {
					if (project.duration) {
						project.duration = project.duration + time.duration
								} else {
						project.duration = time.duration
					}
				}
			})
		})

		debugger;
	}

	componentDidMount() {
		this.doughnutLogic("2019-04-01 00:00")

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
		const months = [
			{text: "January", value: "2019-01-01 00:00"},
			{text: "February", value: "2019-02-01 00:00"},
			{text: "March", value: "2019-03-01 00:00"},
			{text: "April", value: "2019-04-01 00:00"},
			{text: "May", value: "2018-05-01 00:00"},
			{text: "June", value: "2018-06-01 00:00"},
			{text: "July", value: "2018-07-01 00:00"},
			{text: "August", value: "2018-08-01 00:00"},
			{text: "September", value: "2018-09-01 00:00"},
			{text: "October", value: "2018-10-01 00:00"},
			{text: "November", value: "2018-11-01 00:00"},
			{text: "December", value: "2018-12-01 00:00"}
		]

		return (
			<div>
				<h1>Dashboard </h1>
				<Dropdown
					options={months}
					placeholder="Customer"
					id="customer"
					selection
					onChange={(e, { value }) => this.doughnutLogic(value)}
				>
				</Dropdown>
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