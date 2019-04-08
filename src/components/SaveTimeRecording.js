import React, { Component } from "react";
import { saveTime } from "../modules/saveTimeSheet";
import TimeInputForm from "./TimeInputForm";
import { Form, Button, Grid, Dropdown } from "semantic-ui-react";
import { fetchCustomers, fetchProjects, fetchActivities } from "../modules/test";


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
			showProjectsDropdown: false,
			showActivitiesDropdown: false

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
		})
	}

	async postTimesheets() {
		const response = await saveTime(this.state.begin, this.state.end, this.state.customer, this.state.project, this.state.activity);

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
			timeSaved: false
		});
	}

	handleCustomerChange(option) {
		this.setState({ customer: option }, async () => {
			const filteredProjects = await this.state.projects.filter(val => {
				return val.customer === option
				debugger;
			})
			this.setState({showProjectsDropdown: true, projects: filteredProjects });
		});
	}

	handleProjectChange(option) {
		this.setState({ project: option }, async () => {
			const filteredActivities = await this.state.activities.filter(val => {
				return val.project === option
			})
			this.setState({showActivitiesDropdown: true, activities: filteredActivities });
		});
	}

	handleActivityChange(option) {
		this.setState({ activity: option });
	}

	render() {
		let saveButton;
		let projectsDropdown;
		let activitiesDropdown;
		const customers = this.state.customers.map(val => {
			return  {text: val.name,  value: val.id}
		})
		const projects = this.state.projects.map(val => {
			return  {text: val.name,  value: val.id}
		})
		const activities = this.state.activities.map(val => {
			return  {text: val.name,  value: val.id}
		})


		if (this.state.showProjectsDropdown === true) {
			projectsDropdown = (
				<Dropdown
					options={projects}
					id="projects"
					selection
					onChange={(e, { value }) => this.handleProjectChange(value)}
				/>
			)
		}

		if (this.state.showActivitiesDropdown === true) {
			activitiesDropdown = (
				<Dropdown
					options={activities}
					id="activity"
					selection
					onChange={(e, { value }) => this.handleActivityChange(value)}
				/>
			)
		}

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
			<div id="time-block">
				<Grid textAlign="center" columns={4}>
					<Grid>
						<Form.Group
							width="full"
							style={{
								background: "#DDDD",
								paddingTop: "10%",
								paddingBottom: "10%",
								width: "1740px",
								position: "absolute",
								marginTop: "50%"
							}}
						>
							<Dropdown
								options={customers}
								id="customer"
								selection
								onChange={(e, {value}) => this.handleCustomerChange(value)}
							/>
							{projectsDropdown}
							{activitiesDropdown}
							<TimeInputForm
								style={{
									aligncontent: "left"
								}}
								changeValue={this.onChange.bind(this)}
								begin={this.state.begin}
								end={this.state.end}
							/>
							{saveButton}
						</Form.Group>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default SaveTimeRecording;
