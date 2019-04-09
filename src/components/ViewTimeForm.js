import React, { Component } from "react";
import "../index.css";
import moment from "moment-timezone";

class ViewTimeForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const timesheets = this.props.timesheets;
		const items = [
			{
				name: "START TIME"
			},
			{
				name: "END TIME"
			},
			{
				name: "DURATION"
			},
			{
				name: "PROJECT"
			},
			{
				name: "ACTIVITY"
			}
		];

		return (
			<div className="viewDiv">
				<div>
					{items.map((item, index) => {
						return (
							<div key={index}>
								<label className="itemTitle">{item.name}</label>
							</div>
						);
					})}
				</div>
				<div>
				<div className="timesheet">
					{timesheets.map((item, index) => {
						return (
							<div key={index} className="dataDiv">
								<label className="itemData">
									{moment(item.begin)
										.tz("Europe/Stockholm")
										.format("YYYY-MM-DD HH:mm A")}{" "}
								</label>
								<label className="itemData">
									{moment(item.end)
										.tz("Europe/Stockholm")
										.format("YYYY-MM-DD HH:mm A")}{" "}
								</label>
								<label className="itemData">{item.duration}</label>
								<label className="itemData">{item.project}</label>
								<label className="itemActivity">{item.activity}</label>
							</div>
						);
					})}
				</div>
			</div>
			</div>
		);
	}
}

export default ViewTimeForm;
