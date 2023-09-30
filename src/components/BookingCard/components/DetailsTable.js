import {
	faCalendar,
	faComment,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../../GlobalContext";
import { Link } from "react-router-dom";
import React from "react";
import calendarUrlFromPotentialDates from "../../../helpers/calendarUrlFromPotentialDates";
import parsePotentialDates from "../../../helpers/parsePotentialDates";

export default ({
	group_size,
	customer,
	customer_name,
	potential_dates,
	comments_or_questions,
	index,
}) => {
	const { setHighlight } = React.useContext(GlobalContext);

	return (
		<table>
			<thead>
				<tr>
					<td colSpan={2}>
						<h5>Group of {group_size}</h5>
					</td>
				</tr>
			</thead>
			<tbody>
				{[
					[
						faUser,
						<Link to={`/customer/${customer}`}>
							{customer_name}
						</Link>,
					],
					[
						faCalendar,
						<Link
							to={calendarUrlFromPotentialDates(potential_dates)}
						>
							See all{" "}
							{parsePotentialDates(potential_dates).length}{" "}
							date(s) in calendar
						</Link>,
					],
					[
						faComment,
						comments_or_questions && (
							<p
								style={{
									cursor: "pointer",
									overflow: "hidden",
									whiteSpace: "nowrap",
									textOverflow: "ellipsis",
									maxWidth: "275px",
									margin: "0",
								}}
								onClick={setHighlight.bind(
									null,
									comments_or_questions
								)}
							>
								{comments_or_questions}
							</p>
						),
					],
				].map(
					([icon, text], i) =>
						text && (
							<tr key={`booking-details-${index}-${i}`}>
								<td>
									<FontAwesomeIcon icon={icon} />
								</td>
								<td>{text}</td>
							</tr>
						)
				)}
			</tbody>
		</table>
	);
};
