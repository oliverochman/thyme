import React from "react";
import { Input } from "semantic-ui-react";
import '../index.css';

const TimeInputForm = props => {
	return (
		<div style={{ marginTop: '20px', marginBottom: '20px'}}>
			<label name="Start Time" className="time" style={{marginRight: '10px'}}>Start Time</label>
			<Input
				placeholder="00:00"
				onChange={props.changeValue}
				name="begin"
				style={{
					marginRight: '10px'
				}}
			/>
			<label name="End Time" className="time" style={{marginRight: '10px'}}>End Time</label>
			<Input
				placeholder="00:00"
				onChange={props.changeValue}
				name="end"
				style={{
					marginRight: '20px'
				}}
			/>
			<label name="rate-input" className="rate" style={{marginRight: '10px'}}>Rate</label>
			<Input
				placeholder="$"
				onChange={props.changeValue}
				name="rate"
				style={{
					marginRight: '20px'
				}}
			/>
			<label name="description" className="description" style={{marginRight: '10px'}}>Description</label>
			<Input
				onChange={props.changeValue}
				name="description"
				style={{
					marginRight: '20px'
				}}
			/>
		</div>
	);
};

export default TimeInputForm;
