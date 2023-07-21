import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../../GlobalContext";
import React from "react";
import buttonGroups from "../button-groups";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import handleArchiveBooking from "../helpers/handleArchiveBooking";

export default ({ booking, onChange }) => {
	const { setError, setConfirm } = React.useContext(GlobalContext);

	let buttons = [
		{
			children: <FontAwesomeIcon icon={faArchive} />,
			variant: "secondary",
			onClick: function () {
				setConfirm({
					prompt: "Are you sure you want to archive this booking? (This will hide this booking card from view on the bookings page)",
					dangerous: true,
					confirmButtonText: "Yes",
					onConfirm: handleArchiveBooking.bind(null, ...arguments),
				});
			},
		},
	];

	if (["confirmed", "unconfirmed"].includes(booking.status))
		buttons = [...buttonGroups[booking.status](setConfirm), ...buttons];

	return buttons.map(({ onClick, ...p }) => (
		<Button
			onClick={onClick.bind(null, booking, onChange, setError)}
			{...p}
			style={{ marginLeft: "5px" }}
			size="sm"
		/>
	));
};
