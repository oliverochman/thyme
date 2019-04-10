import axios from "axios";

const apiUrl = "https://demo.kimai.org/api/";

const fetchCustomers = async () => {
	const username = JSON.parse(sessionStorage.current_user).username;
	const password = JSON.parse(sessionStorage.current_user).password;
	const path = apiUrl + "customers";
	let headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};
	try {
		const response = await axios.get(path, {
			headers: headers
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const fetchProjects = async () => {
	const username = JSON.parse(sessionStorage.current_user).username;
	const password = JSON.parse(sessionStorage.current_user).password;
	const path = apiUrl + "projects?visible=3";
	let headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};

	try {
		const response = await axios.get(path, {
			headers: headers,
			mode: "cors"
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};

const fetchActivities = async () => {
	const username = JSON.parse(sessionStorage.current_user).username;
	const password = JSON.parse(sessionStorage.current_user).password;
	const path = apiUrl + "activities?visible=3";
	let headers = {
		"X-AUTH-USER": username,
		"X-AUTH-TOKEN": password
	};

	try {
		const response = await axios.get(path, {
			headers: headers,
			mode: "cors"
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};

export { fetchCustomers, fetchProjects, fetchActivities };
