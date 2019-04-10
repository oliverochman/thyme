import axios from "axios";

const getActivities= async () => {
	const apiUrl = "https://demo.kimai.org/api/";
	const path = apiUrl + 'activities?visible=3';

  const user = JSON.parse(sessionStorage.current_user).username
	const password = JSON.parse(sessionStorage.current_user).password

	let headers = {
		"X-AUTH-USER": user,
		"X-AUTH-TOKEN": password,
	};

	try {
		const resp = await axios.get(path, {
			headers: headers,
			mode: "cors"
		});
		return resp;
	} catch (error) {
		return error;
	}
};

export { getActivities };
