import {
	BookingCard,
	CloseTrigger,
	StatusIcon,
	Summary,
	Wrapper,
} from "./styles";

import React from "react";
import statusMap from "../../../../../status-map";
import { useHistory } from "react-router-dom";

export default ({ color, date, ...booking }) => {
	const { customer_name, group_size, index, status } = booking;

	const history = useHistory(),
		reload = () => history.go(0);

	const [showCard, setShowCard] = React.useState(false);

	// Mild hack. The card/trigger couldn't recieve the click and
	// set the state to false if the card/trigger no longer existed ..
	const handleHideCard = () => window.setTimeout(() => setShowCard(false));

	return (
		<React.Fragment>
			<Wrapper
				color={statusMap[status].color}
				secondaryColor={statusMap[status].secondaryColor || "white"}
				onClick={() => setShowCard(true)}
				unconfirmed={status === "unconfirmed"}
				title={statusMap[status].title}
			>
				<Summary>
					{customer_name}, {group_size}
				</Summary>
				{
					<StatusIcon
						icon={statusMap[status].icon}
						title={statusMap[status].title}
						color={statusMap[status].secondaryColor || "white"}
					/>
				}
				<BookingCard
					position={+date.day() >= 5 ? "left" : "right"}
					style={{ display: showCard ? "block" : "none" }}
					confirmFor={date.format("DD/MM/YYYY")}
					onHide={handleHideCard}
					booking={booking}
					onChange={reload}
				/>
				<CloseTrigger
					style={{ display: showCard ? "block" : "none" }}
					onClick={handleHideCard}
				/>
			</Wrapper>
		</React.Fragment>
	);
};
