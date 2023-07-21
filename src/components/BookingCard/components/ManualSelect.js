import {
	faCheckCircle,
	faEnvelope,
	faEnvelopeOpen,
	faMinusCircle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../../GlobalContext";
import React from "react";
import patch from "../../../api/patch";
import styled from "styled-components";
import theme from "../../../theme";

const DropdownItem = styled(Dropdown.Item)`
	.icon-wrapper {
		width: 30px;
		text-align: left;
		display: inline-block;
	}
`;

const status = {
	unconfirmed: {
		icon: faEnvelope,
		title: "Unconfirmed",
	},
	engaging: {
		icon: faEnvelopeOpen,
		title: "Currently engaging",
	},
	confirmed: {
		icon: faCheckCircle,
		title: "Confirmed",
	},
	rejected: {
		icon: faXmarkCircle,
		title: "Rejected",
	},
	redundant: {
		icon: faMinusCircle,
		title: "Redundant",
	},
};

export default ({ booking, onChange }) => {
	const { setError } = React.useContext(GlobalContext);

	const handleChangeBookingStatus = (status) =>
		patch(`/booking/${booking.index}`, { status })
			.then(onChange)
			.catch(({ message }) => setError(message));

	return (
		<DropdownButton
			as={ButtonGroup}
			title="Mark as"
			size="sm"
			variant="outline-secondary"
			style={{
				position: "absolute",
				right: `${theme.gutter}px`,
				top: `${theme.gutter}px`,
			}}
		>
			{Object.entries(status).map(([key, { icon, title }]) => (
				<DropdownItem
					onClick={handleChangeBookingStatus.bind(null, key)}
				>
					<div class="icon-wrapper">
						<FontAwesomeIcon icon={icon} />
					</div>{" "}
					{title}
				</DropdownItem>
			))}
		</DropdownButton>
	);
};
