import React from "react";
import { shallow, mount } from "enzyme";
import TimeInputForm from "../components/TimeInputForm";

describe("<TimeInputForm />", () => {
	it("calls timeInputForm from SaveTimeRecording", () => {
		TimeInputForm.timeInputForm = jest.fn();
		const describedComponent = mount(<TimeInputForm />);
		describedComponent.find({rate: "50"});
		describedComponent.instance();
		expect(describedComponent.find("Input"))
	})

	it("has 4 input fields", () => {
		const describedComponent = shallow(<TimeInputForm />);
		expect(describedComponent.find("Input")).toHaveLength(4);
	})
})