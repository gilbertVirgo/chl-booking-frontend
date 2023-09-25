import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import parsePotentialDates from "./parsePotentialDates";
dayjs.extend(customParseFormat);

export default (potential_dates) => {
	const firstPotentialDate = dayjs(
		parsePotentialDates(potential_dates)[0],
		"DD/MM/YYYY"
	);

	return `/bookings/calendar/${firstPotentialDate.year()}/${firstPotentialDate.month()}`;
};
