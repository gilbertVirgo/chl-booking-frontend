const API_ROOT = "http://localhost:4000";

export default async (
	route,
	{ method, body, options = { fileUpload: false } }
) => {
	const requestProps = {
		method,
		headers: {},
	};

	if (body) {
		requestProps.body = options.fileUpload ? body : JSON.stringify(body);

		if (!options.fileUpload)
			requestProps.headers["Content-Type"] = "application/json";
	}

	let jwt;
	if ((jwt = localStorage.getItem("jwt"))) {
		requestProps.headers.authorization = "Bearer " + jwt;
	}

	console.log({ requestProps });

	const { success, ...json } = await (
		await fetch(API_ROOT + route, requestProps)
	).json();

	if (!success) {
		if (json.type === "TokenError")
			return window.location.replace("/login");

		throw new Error(json.message);
	}

	return json;
};
