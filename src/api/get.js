import request from "./request";

export default (route, params = "") =>
	request(
		route + (params ? `?${new URLSearchParams(params).toString()}` : ""),
		{ method: "GET" }
	);
