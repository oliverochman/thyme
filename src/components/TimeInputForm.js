import React from "react";
import { Input } from "semantic-ui-react";
import '../index.css';

const TimeInputForm = props => {
	return (
		<div>
			<label name="Start Time" className="time">Start Time</label>
			<Input
				placeholder="00:00"
				onChange={props.changeValue}
				name="begin"
			/>
			<label name="End Time" className="time">End Time</label>
			<Input
				placeholder="00:00"
				onChange={props.changeValue}
				name="end"
			/>
			<label name="rate-input" className="rate">Rate</label>
			<Input
				placeholder="$"
				onChange={props.changeValue}
				name="rate"
			/>
			<label name="description" className="description">Description</label>
			<Input
				onChange={props.changeValue}
				name="description"
			/>
		</div>
	);
};

export default TimeInputForm;
