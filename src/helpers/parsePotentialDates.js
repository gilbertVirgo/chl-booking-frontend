export default (potential_dates) =>
	potential_dates.includes(",")
		? potential_dates.split(",")
		: [potential_dates];
