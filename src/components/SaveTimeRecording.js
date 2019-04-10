import React, { Component } from "react";
import { saveTime } from "../modules/saveTimeSheet";
import TimeInputForm from "./TimeInputForm";
import { Segment, Button, Grid, Dropdown } from "semantic-ui-react";
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
			showProjectsDropdown: true,
			showActivitiesDropdown: true
		};
	}

	async componentDidMount() {
		const customers = await fetchCustomers();
		const projects = await fetchProjects();
		const activities = await fetchActivities();
		this.setState({
			activities: activities,
			projects: projects,
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
				timeSaved: true
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
			errorMessage: ''
		});
	}

	handleCustomerChange(option) {
		this.setState({
			customer: option,
			errorMessage: '',
			timeSaved: false
		});
	}

	handleProjectChange(option) {
		this.setState({
			project: option,
			errorMessage: '',
			timeSaved: false
		});
	}

	handleActivityChange(option) {
		this.setState({ activity: option });
	}

	magic() {
		if (this.state.customer != '') {
			const filtered = this.state.projects.filter(val => {
				return val.customer === this.state.customer
			});
			return filtered.map(val => {
				return { text: val.name, value: val.id };
			});
		} else {
			return this.state.projects
		}
	}

	render() {
		let saveButton;

		const	customers = this.state.customers.map(val => {
				return { text: val.name, value: val.id };
			});

		const projects = this.state.projects.map(val => {
			return { text: val.name, value: val.id };
		});
		const activities = this.state.activities.map(val => {
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
				<Grid
					columns="equal"
					textAlign="center"
					style={{
						background: "#DDDD",
						paddingTop: "2%",
						paddingBottom: "2%",
						textAlign: "center",
						width: "1300px"
					}}
				>
					<Grid.Column>
						<Segment>
							<Dropdown
								style={{
									marginLeft: "10px"
								}}
								options={customers}
								placeholder="Customer"
								id="customer"
								selection
								onChange={(e, { value }) => this.handleCustomerChange(value)}
							/>
						</Segment>
					</Grid.Column>
					<Grid.Column>
						<Segment>
							<Dropdown
								options={ this.magic() }
								placeholder="Project"
								id="projects"
								selection
								onChange={(e, { value }) => this.handleProjectChange(value)}
							/>
						</Segment>
					</Grid.Column>
					<Grid.Column>
						<Segment>
							<Dropdown
								options={activities}
								placeholder="Activity"
								id="activity"
								selection
								onChange={(e, { value }) => this.handleActivityChange(value)}
							/>
						</Segment>
					</Grid.Column>
					<Grid.Column>
						<Segment>
							<TimeInputForm
								style={{
									aligncontent: "left"
								}}
								changeValue={this.onChange.bind(this)}
								begin={this.state.begin}
								end={this.state.end}
							/>
						</Segment>
					</Grid.Column>
					<Grid.Column>
						<Segment>{saveButton}</Segment>
					</Grid.Column>
				</Grid>
			</>
		);
	}
}

export default SaveTimeRecording;
