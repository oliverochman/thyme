import axios from "axios";
import moment from "moment";

const saveTime = async (begin, end, customer, project, activity) => {
	const apiUrl = "https://demo-stable.kimai.org/api/";
	const proxyUrl = "https://cors-anywhere.herokuapp.com/";

	let headers = {
		"X-AUTH-USER": "susan_super",
		"X-AUTH-TOKEN": "api_kitten",
		"Access-Control-Allow-Origin": "*",
		Accept: "application/json",
		"Content-Type": "application/json"
	};
	debugger;
	try {
		const response = await axios.post(
			proxyUrl + apiUrl + "timesheets",
			{
				begin: moment(begin, "hh:mm")
					.add(2, "hours")
					.format("YYYY-MM-DD hh:mm"),
				end: moment(end, "hh:mm")
					.add(+2, "hours")
					.format("YYYY-MM-DD hh:mm"),
				customer: customer,
				project: project,
				activity: activity,
				description: "string",
				fixedRate: "1.0",
				hourlyRate: "1.0"
			},
			{
				headers: headers,
				mode: "cors"
			}
		);
		console.log(response);
		return response;
	} catch (error) {
		return error;
	}
};

export { saveTime };
