import request from "./request";

export default (route, body, options) =>
	request(route, { method: "PATCH", body, options });
