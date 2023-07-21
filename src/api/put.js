import request from "./request";

export default (route, body) => request(route, { method: "PUT", body });
