import React from "react";
import { shallow, mount } from "enzyme";
import SaveTimeRecording from "../components/SaveTimeRecording";
import * as saveTimeSheet from "../modules/saveTimeSheet";

describe("<SaveTimeRecording />", () => {
	it("calls postTimesheets when button is clicked", () => {
		const postTimesheetsSpy = jest.spyOn(
			SaveTimeRecording.prototype,
			"postTimesheets"
		);
		const describedComponent = mount(<SaveTimeRecording />);
		describedComponent.find("button").simulate("click");
		expect(postTimesheetsSpy).toHaveBeenCalled();
	});

	it("Dropdown onChange calls on handleCustomerChange", () => {
		const handleCustomerChangeSpy = jest.spyOn(
			SaveTimeRecording.prototype,
			"handleCustomerChange"
		);
		const describedComponent = mount(<SaveTimeRecording />);
		describedComponent.find("Dropdown[id='customer']").simulate("change", {
			option: { value: "1" }
		});
		expect(handleCustomerChangeSpy).toHaveBeenCalled();
	});

	it("Dropdown onChange calls on handleProjectChange", () => {
		const handleProjectChangeSpy = jest.spyOn(
			SaveTimeRecording.prototype,
			"handleProjectChange"
		);
		const describedComponent = mount(<SaveTimeRecording />);
		describedComponent.find("Dropdown[id='projects']").simulate("change", {
			option: { value: "1" }
		});
		expect(handleProjectChangeSpy).toHaveBeenCalled();
	});

	it("Dropdown onChange calls on handleActivityChange", () => {
		const handleActivityChangeSpy = jest.spyOn(
			SaveTimeRecording.prototype,
			"handleActivityChange"
		);
		const describedComponent = mount(<SaveTimeRecording />);
		describedComponent.find("Dropdown[id='activity']").simulate("change", {
			option: { value: "1" }
		});
		expect(handleActivityChangeSpy).toHaveBeenCalled();
	});
});
