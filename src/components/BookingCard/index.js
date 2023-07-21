import {
	faCalendar,
	faComment,
	faUser,
	faWarning,
} from "@fortawesome/free-solid-svg-icons";

import Buttons from "./components/Buttons";
import Card from "react-bootstrap/Card";
import { CardBody } from "../../pages/Bookings/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../GlobalContext";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";
import ManualSelect from "./components/ManualSelect";
import React from "react";
import Subtext from "../Subtext";
import parseDate from "../../helpers/parseDate";
import theme from "../../theme";
import timeAgo from "../../time-ago";

export default ({ onChange, booking }) => {
	const {
		archived,
		date,
		customer: customer_index,
		customer_name,
		created_at,
		group_size,
		comments_or_questions,
		status,
	} = booking;

	const { setHighlight } = React.useContext(GlobalContext);

	return (
		<React.Fragment>
			<Card bg={status === "unconfirmed" && "warning"}>
				<CardBody style={{ position: "relative" }}>
					<ManualSelect {...{ booking, onChange }} />
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
									<Link to={`/customer/${customer_index}`}>
										{customer_name}
									</Link>,
								],
								[faCalendar, date],
								[
									faComment,
									comments_or_questions && (
										<LinesEllipsis
											style={{ cursor: "pointer" }}
											onClick={setHighlight.bind(
												null,
												comments_or_questions
											)}
											text={comments_or_questions}
											maxLine={3}
											ellipsis="..."
											trimRight
											basedOn="letters"
										/>
									),
								],
							].map(
								([icon, text], k) =>
									text && (
										<tr key={k}>
											<td>
												<FontAwesomeIcon icon={icon} />
											</td>
											<td>{text}</td>
										</tr>
									)
							)}
						</tbody>
					</table>
				</CardBody>
				<Card.Footer style={{ display: "flex" }}>
					<Subtext style={{ flex: 1 }}>
						Requested {timeAgo.format(parseDate(created_at))}
					</Subtext>

					{archived ? (
						<Subtext>(Archived)</Subtext>
					) : (
						<Buttons {...{ booking, onChange }} />
					)}
				</Card.Footer>
			</Card>
		</React.Fragment>
	);
};
