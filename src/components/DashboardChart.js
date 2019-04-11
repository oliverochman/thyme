import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

class DashboardChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Data: {},
			user: '',
			projects: [],
			activities: [],
		};
	}
	componentDidMount() {
		axios.get('https://demo.kimai.org/api/projects').then(res => {
			const apiUrl = "https://demo.kimai.org/api/";
			const path = apiUrl + 'projects'
			const user = JSON.parse(sessionStorage.current_user).username
			const password = JSON.parse(sessionStorage.current_user).password

			let headers = {
				"X-AUTH-USER": user,
				"X-AUTH-TOKEN": password,
			};
				const resp =  axios.get(path, {
					headers: headers,
					mode: "cors"
				});

			const project = res.data;
			let projects = [];
			let activities = [];
			project.forEach(element => {
				project.push(element.name);
				activities.push(element.score);
			});
			this.setState({
				Data: {
					labels: 'user',
					datasets: [
						{
							label: "projects",
							data: projects,
							backgroundColor: [
								"rgba(255,105,145,0.6)",
								"rgba(155,100,210,0.6)",
								"rgba(90,178,255,0.6)",
								"rgba(240,134,67,0.6)",
								"rgba(120,120,120,0.6)",
								"rgba(250,55,197,0.6)"
							]
						}
					]
				}
			});
		});
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
