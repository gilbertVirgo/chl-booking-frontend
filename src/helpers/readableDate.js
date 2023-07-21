import parseDate from "./parseDate";

export default function (date) {
	date = new Date(parseDate(date));

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return `${days[date.getDay()]} ${date.getDate()} ${
		months[date.getMonth()]
	}, ${date.getFullYear()}`;
}
