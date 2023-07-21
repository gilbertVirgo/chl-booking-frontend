import readableDate from "../helpers/readableDate";

export default (booking, customer) => `Dear ${customer.firstname},%0A%0A

    I am sorry to say that we are not able to serve you on ${readableDate(
		booking.date
	)}. %0A%0A

    We are normally available to give walks and tours throughout the week: please let me know if there's another time when you'd like to come and we will confirm a booking.
`;
