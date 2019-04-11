import React, { Component } from 'react'
import { getTimesheets } from '../modules/getData';
import {
	fetchProjects,
	fetchActivities
} from "../modules/timeData";

import ViewTimeForm from './ViewTimeForm'

class ViewTimeRecording extends Component {
	state = {
		timesheets: null,
		begin: '',
		end: '',
		customer: '',
		project: '',
		activity: '',
		errorMessage: ''
	}

	componentDidMount() {
		this.getTimesheets();
	}

	async matchApi(unFilteredTimesheets, unFilteredProjects, unFilteredActivities) {

		const projectsFiltered = unFilteredTimesheets.map(time => {
			unFilteredProjects.filter(projects => {
					if (time.project === projects.id) {
							time.project = projects.name
					}
			})
			return time
		})
		const activitiesFiltered = projectsFiltered.map(time => {
			unFilteredActivities.filter(activities => {
					if (time.activity === activities.id) {
							time.activity = activities.name
					}
			})
			return time
		})
		return activitiesFiltered
	}

	async getTimesheets() {
		const projects = await fetchProjects();
		const activities = await fetchActivities();
		const timesheets = await getTimesheets();
		if (timesheets.status === 200 && projects.status ===  200 && activities.status ===  200) {
			const processedTimesheets = await this.matchApi(timesheets.data, projects.data, activities.data)
			this.setState({
				timesheets: processedTimesheets
			});
		} else {
			console.log("response error")
		}
	}

	render() {
		let timesheets = this.state.timesheets
		let fetchData
		if (timesheets != null) {
			fetchData = (
				<div>
					<ViewTimeForm
						timesheets={this.state.timesheets}
					/>
				</div>
			)
		} else {
			console.log("error")
		}

		return (
			<div>
				<h1 className="timeHistoryTitle">My Activity History</h1>
				{fetchData}
			</div>
		)
	}
}

export default ViewTimeRecording
