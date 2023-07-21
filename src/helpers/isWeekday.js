import parseDate from "./parseDate";

export default function (date) {
	date = new Date(parseDate(date));

	return Boolean(date.getDay() % 6);
}
