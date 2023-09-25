import * as Text from "../../Text";

import { Form } from "react-bootstrap";
import GlobalContext from "../../../GlobalContext";
import { Link } from "react-router-dom";
import React from "react";
import emailTemplates from "../../../email-templates";
import get from "../../../api/get";
import patch from "../../../api/patch";
import post from "../../../api/post";

export default ({ booking, onChange }) => {
	const { index, email_sent, on_calendar, confirmed_date } = booking;

	const [emailSentChecked, setEmailSentChecked] = React.useState(
		email_sent || false
	);
	const [onCalendarChecked, setOnCalendarChecked] = React.useState(
		on_calendar || false
	);

	const { setConfirm, setLoading, setError } =
		React.useContext(GlobalContext);

	const handleChangeOnCalendar = ({ target: { checked } }) => {
		setOnCalendarChecked(checked);
		patch(`/booking/${index}`, { on_calendar: checked }).catch(setError);
	};
	const handleChangeEmailSent = ({ target: { checked } }) => {
		setEmailSentChecked(checked);
		patch(`/booking/${index}`, { email_sent: checked }).catch(setError);
	};

	const handleAddToCalendar = (e) => {
		e.preventDefault(); // halt the link

		setConfirm({
			prompt: "Are you sure you want to add this event to your calendar?",
			confirmButtonText: "Yes",
			onConfirm: () => {
				setLoading(true);
				post(`/booking/${index}/calendar`)
					.then(
						patch.bind(null, `/booking/${index}`, {
							on_calendar: true,
						})
					)
					.then(onChange)
					.catch(setError);
			},
		});
	};

	const handleSendEmail = async (e) => {
		e.preventDefault();

		get(`/booking/${index}/customer`)
			.then(({ data: customer }) => {
				window.location.href = `mailto:${
					customer.email
				}?body=${emailTemplates.confirm(
					{ ...booking, confirmed_date },
					customer
				)}&subject=Christian%20Heritage%20London%20walk%20with%20${
					customer.firstname
				}`;
			})
			.then(patch.bind(null, `/booking/${index}`, { email_sent: true }))
			.then(onChange)
			.catch(setError);
	};

	return (
		<React.Fragment>
			<hr />
			<table>
				<tbody>
					<tr>
						<td>
							<Form.Check
								checked={onCalendarChecked}
								onChange={handleChangeOnCalendar}
							/>
						</td>
						<td>
							{onCalendarChecked ? (
								<Text.CheckedOff>
									Reflected on calendar
								</Text.CheckedOff>
							) : (
								<span>
									Reflected on calendar{" "}
									<Link to="" onClick={handleAddToCalendar}>
										(add to calendar)
									</Link>
								</span>
							)}
						</td>
					</tr>
					<tr>
						<td>
							<Form.Check
								checked={emailSentChecked}
								onChange={handleChangeEmailSent}
							/>
						</td>
						<td>
							{emailSentChecked ? (
								<Text.CheckedOff>Email sent</Text.CheckedOff>
							) : (
								<span>
									Email sent{" "}
									<Link to="" onClick={handleSendEmail}>
										(write confirmation email)
									</Link>
								</span>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</React.Fragment>
	);
};

/*
Rather than having action buttons for confirming/rejecting
I'm moving into this new space where we use the 'mark as'
select box, and then have these two checkboxes for when
the booking is marked as 'confirmed'. 

When the 'on_calendar' is set to FALSE, there should be a 
button/link which will add the date to calendar. (Use 
node-google-calendar). Similar for when the 'email_sent' 
is FALSE.
*/
