import { DateNumber, Wrapper } from "./styles";

import Booking from "../Booking";

export default ({ date, bookings, ...p }) => {
	return (
		<Wrapper {...p}>
			<DateNumber>{date.format("D")}</DateNumber>
			{bookings.map((booking, index) => (
				<Booking key={`bci-${index}`} date={date} {...booking} />
			))}
		</Wrapper>
	);
};
