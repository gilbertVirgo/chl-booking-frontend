import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

export default (dayA, dayZ) => {
	const rangeLength = dayjs(dayZ).diff(dayjs(dayA), "day");

	return Array(rangeLength)
		.fill(null)
		.map((n, i) => dayjs(dayA).add(i, "day"));
};
