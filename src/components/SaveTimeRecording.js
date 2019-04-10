import React, { Component } from "react";
import { saveTime } from "../modules/saveTimeSheet";
import TimeInputForm from "./TimeInputForm";
import '../index.css';
import { Button, Grid, Dropdown } from "semantic-ui-react";
import {
	fetchCustomers,
	fetchProjects,
	fetchActivities
} from "../modules/timeData";

class SaveTimeRecording extends Component {
	constructor(props) {
		super(props);
		this.postTimesheets = this.postTimesheets.bind(this);
		this.state = {
			begin: "",
			end: "",
			customer: "",
			project: "",
			activity: "",
			rate: "",
			timeSaved: false,
			activities: [],
			projects: [],
			customers: [],
			description: "",
		};
	}

	async componentDidMount() {
		const customers = await fetchCustomers();
		const projects = await fetchProjects();
		const activities = await fetchActivities();
		this.setState({
			activities: activities.data,
			projects: projects.data,
			customers: customers
		});
	}

	async postTimesheets() {
		const response = await saveTime(
			this.state.begin,
			this.state.end,
			this.state.customer,
			this.state.project,
			this.state.activity,
			this.state.rate,
			this.state.description
		);
		if (response.status === 200) {
			this.setState({
				timeSaved: true,
			});
		} else {
			this.setState({
				errorMessage:
					"Your time was not saved, make sure that you use the correct format"
			});
		}
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
			timeSaved: false,
			errorMessage: ""
		});
	}

	handleCustomerChange(option) {
		this.setState({
			customer: option,
			errorMessage: "",
			timeSaved: false
		});
	}

	handleProjectChange(option) {
		this.setState({
			project: option,
			errorMessage: "",
			timeSaved: false
		});
	}

	handleActivityChange(option) {
		this.setState({ activity: option });
	}

	filterProjects() {
		if (this.state.customer != "") {
			const filtered = this.state.projects.filter(val => {
				return val.customer === this.state.customer;
			});
			return filtered.map(val => {
				return { text: val.name, value: val.id };
			});
		} else {
			return this.state.projects.map(val => {
				return { text: val.name, value: val.id };
			});
		}
	}

	filterActivities() {
		if (this.state.project != "") {
			const filtered = this.state.activities.filter(val => {
				return val.project === this.state.project;
			})
			return filtered.map(val => {
				return { text: val.name, value: val.id };
			})
		} else {
			return this.state.activities.map(val => {
				return { text: val.name, value: val.id };
			});
		}
	}

	render() {
		let saveButton;

		const customers = this.state.customers.map(val => {
			return { text: val.name, value: val.id };
		});

		if (!this.state.timeSaved) {
			saveButton = (
				<>
					<Button
						style={{ background: "#46b395", marginLeft: "10px" }}
						name="create"
						onClick={this.postTimesheets.bind(this)}
					>
						Create
					</Button>
					<p name="error-message">{this.state.errorMessage}</p>
				</>
			);
		} else {
			saveButton = <p name="save-message">Your time was saved</p>;
		}

		return (
			<>
				<Grid columns="equal" textAlign="center" className="gridBackground">
					<div>
						<TimeInputForm
							style={{
								aligncontent: "left",
								float: 'left'
							}}
							changeValue={this.onChange.bind(this)}
							begin={this.state.begin}
							end={this.state.end}
						/>
					</div>

					<div style={{ margin: '10px'}}>
						<Grid.Column>
							<Dropdown
								style={{
									marginLeft: "20px",
									width: '300px'
								}}
								options={customers}
								placeholder="Customer"
								id="customer"
								selection
								onChange={(e, { value }) => this.handleCustomerChange(value)}
							/>

							<Dropdown
							style={{
								marginLeft: "20px",
								width: '300px'
							}}
								options={this.filterProjects()}
								placeholder="Project"
								id="projects"
								selection
								onChange={(e, { value }) => this.handleProjectChange(value)}
							/>

							<Dropdown
							style={{
								marginLeft: "20px",
								width: '300px'
							}}
								options={this.filterActivities()}
								placeholder="Activity"
								id="activity"
								selection
								onChange={(e, { value }) => this.handleActivityChange(value)}
							/>
							{saveButton}
						</Grid.Column>
					</div>
				</Grid>
			</>
		);
	}
}

export default SaveTimeRecording;
