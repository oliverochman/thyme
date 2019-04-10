import axios from "axios";
import moment from "moment-timezone";

const saveTime = async (begin, end, customer, project, activity, rate, description) => {
	const apiUrl = "https://demo.kimai.org/api/";

	const username = JSON.parse(sessionStorage.current_user).username;
	const password = JSON.parse(sessionStorage.current_user).password;

	let headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};
	debugger
	try {
		const response = await axios.post(
		  apiUrl + "timesheets",
			{
				begin: moment(begin, "HH:mm")
					.format("YYYY-MM-DD HH:mm"),
				end: moment(end, "HH:mm")
					.format("YYYY-MM-DD HH:mm"),
				customer: customer,
				project: project,
				activity: activity,
				description: description,
				fixedRate: rate,
				hourlyRate: rate
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
