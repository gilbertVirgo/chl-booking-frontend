import Button from "react-bootstrap/Button";
import GlobalContext from "../../../GlobalContext";
import React from "react";
import buttons from "../buttons";

export default ({ booking, onChange }) => {
	const { setError, setConfirm } = React.useContext(GlobalContext);

	let buttonGroup = [buttons.archive(setConfirm)];

	if (booking.status === "unconfirmed")
		buttonGroup.unshift(buttons.reject(setConfirm));
	if (booking.status === "confirmed")
		buttonGroup.unshift(buttons.followUp(setConfirm));

	return buttonGroup.map(({ onClick, ...p }) => (
		<Button
			onClick={onClick.bind(null, booking, onChange, setError)}
			{...p}
			style={{ marginLeft: "5px" }}
			size="sm"
		/>
	));
};
