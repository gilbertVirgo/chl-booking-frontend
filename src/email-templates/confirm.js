import isWeekday from "../helpers/isWeekday";
import readableDate from "../helpers/readableDate";

export default (booking, customer) => `Dear ${customer.firstname},%0A%0A

    Delighted to confirm your booking on ${readableDate(
		booking.confirmed_date
	)}.%0A%0A

    ${
		isWeekday(booking.confirmed_date)
			? "Please meet [[ Ben Virgo? ]] on the steps of St. Paul's Cathedral at 10 am."
			: "Please meet [[ Ben Virgo? ]] on the steps at the front entrance of the British Museum at 10 am."
	}%0A%0A

    Payment in cash at the end of the walk is most straightforward: there are ATMs in the British Museum and the City. The charge is ${
		isWeekday(booking.confirmed_date) ? "£25" : "£27"
	} per person.%0A%0A

  [[ (1.) Using Spark, select 'Templates' (or ⌘⇧T) → 'Confirm' at the bottom, then (2.) remove this text. ]] %0A%0A`;
