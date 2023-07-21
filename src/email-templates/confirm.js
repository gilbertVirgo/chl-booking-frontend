import isWeekday from "../helpers/isWeekday";
import readableDate from "../helpers/readableDate";

export default (booking, customer) => `Dear ${customer.firstname},%0A%0A

    Delighted to confirm your booking on ${readableDate(booking.date)}.%0A%0A

    ${
		isWeekday(booking.date)
			? "Please meet me on the steps of St. Paul's Cathedral at 10 am."
			: "Please meet me on the steps at the front entrance of the British Museum at 10 am."
	}%0A%0A

    My number is below and my image can be found at christianheritagelondon.org/about.%0A%0A

    There is a short bus/tube journey halfway through the day, so please bring tickets for London transport. I will take you somewhere to get sandwiches or equivalent for lunch, or do bring a packed lunch. While the City Walk is (of course) outside, it's more of a series of stops than a walk. We walk approximately one mile, and each of the stops is under cover: thus we are able to go in all weathers.%0A%0A

    Payment in cash at the end of the walk is most straightforward: there are ATMs in the British Museum and the City. The charge is ${
		isWeekday(booking.date) ? "£25" : "£27"
	} per person.%0A%0A

    If you are new to London we highly recommend the free smartphone app, "Citymapper"—used by many Londoners—which really helps getting around town. %0A%0A

    Please let me know if you have any questions and I look forward to meeting you and taking you through the stories!%0A%0A

    Incidentally, as well as the City, Westminster, the British Museum, the V%26A and the National Gallery, we also give tours of Oxford and Cambridge, looking at the extraordinary history relating to the Reformation, the Puritans, the Christian origins of the universities - Tyndale, Wilberforce, Whitefield, Charles Simeon, C S Lewis and many others; as well as sightseeing day tours of London, visiting the Tower of London and going down the River Thames either to Westminster (the London Eye) or Greenwich.%0A%0A

    If these would be of interest, please contact me for London or Ilona Greyling for Oxford and Cambridge or London sightseeing (Ilona@ChristianHeritageLondon.org).`;
