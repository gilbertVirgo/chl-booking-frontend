import { default as DefaultBookingCard } from "../../../../../components/BookingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Wrapper = styled.div`
	background-color: ${({ color }) => color};
	color: ${({ secondaryColor }) => secondaryColor};
	${({ unconfirmed }) =>
		unconfirmed &&
		`background-image: url("${require("../../../../../assets/striped.png")}"); background-repeat: repeat; background-size: cover;`}
	padding: 5px;
	padding-right: 22px;
	box-sizing: border-box;
	border-radius: 0.375rem;
	position: relative;
	cursor: pointer;
	margin-bottom: 5px;
`;

export const Summary = styled.span`
	font-size: 12px;
	line-height: 16px;
	display: block;
`;

export const StatusIcon = styled(FontAwesomeIcon)`
	position: absolute;
	right: 5px;
	top: 5px;
	color: ${({ color }) => color};
`;

export const BookingCard = styled(DefaultBookingCard)`
	cursor: auto;

	position: absolute;
	top: 0;
	${({ position }) => {
		switch (position) {
			case "left":
				return `right: calc(100% + 5px)`;
			case "right":
				return `left: calc(100% + 5px)`;
		}
	}};
	width: 350px;
	z-index: 99999;
`;

export const CloseTrigger = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: 99998;
	background-color: #00000060;
`;
