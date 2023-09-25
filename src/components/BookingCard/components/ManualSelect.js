import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../../GlobalContext";
import React from "react";
import patch from "../../../api/patch";
import statusMap from "../../../status-map";
import styled from "styled-components";
import theme from "../../../theme";
import { useHistory } from "react-router-dom";

const DropdownItem = styled(Dropdown.Item)`
	.icon-wrapper {
		width: 30px;
		text-align: left;
		display: inline-block;
	}
`;

export default ({ booking, confirmFor, onChange }) => {
	const { setError } = React.useContext(GlobalContext);

	const handleChangeBookingStatus = (status) => {
		const patchBody = { status };

		if (status === "confirmed") patchBody.confirmed_date = confirmFor;

		patch(`/booking/${booking.index}`, patchBody)
			.then(onChange)
			.catch(({ message }) => setError(message));
	};

	return (
		<DropdownButton
			as={ButtonGroup}
			title={statusMap[booking.status].title}
			size="sm"
			variant="outline-secondary"
			style={{
				position: "absolute",
				right: `${theme.gutter}px`,
				top: `${theme.gutter}px`,
			}}
		>
			{Object.entries(statusMap).map(([key, { icon, title, color }]) => (
				<DropdownItem
					onClick={handleChangeBookingStatus.bind(null, key)}
				>
					<div class="icon-wrapper">
						<FontAwesomeIcon icon={icon} style={{ color }} />
					</div>{" "}
					{title}
				</DropdownItem>
			))}
		</DropdownButton>
	);
};
