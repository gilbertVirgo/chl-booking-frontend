import { default as BSCard } from "react-bootstrap/Card";
import { default as BSCloseButton } from "react-bootstrap/CloseButton";
import GlobalContext from "../../../GlobalContext";
import React from "react";
import styled from "styled-components";
import theme from "../../../theme";

const CloseButton = styled(BSCloseButton)`
	position: absolute;
	left: ${theme.gutter}px;
	top: ${theme.gutter}px;
	background-color: white;
	border-radius: 100%;
`;

const Card = styled(BSCard)`
	${CloseButton} {
		display: none;
	}

	&:hover ${CloseButton} {
		display: block;
	}
`;

export default ({ src, onClose }) => {
	const { setConfirm } = React.useContext(GlobalContext);

	const handleClose = () => {
		setConfirm({
			prompt: "Are you sure you want to delete this image?",
			confirmButtonText: "Yes",
			dangerous: true,
			onConfirm: () => onClose(src),
		});
	};

	return (
		<Card style={{ height: "fit-content" }}>
			<CloseButton onClick={handleClose} />
			<Card.Img src={src} />
		</Card>
	);
};
