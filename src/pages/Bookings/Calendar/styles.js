import Button from "../../../components/Button";
import styled from "styled-components";

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	column-gap: 5px;
	row-gap: 20px;
	margin-top: 20px;
`;

export const Hero = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-areas:
		"prev-button . month-title month-title month-title . next-button"
		". . . . . . .";

	* {
		text-align: center;
		margin: 0;
	}
`;

export const PrevButton = styled(Button).attrs({ variant: "light" })`
	grid-area: prev-button;
	max-width: fit-content;
`;
export const NextButton = styled(Button).attrs({ variant: "light" })`
	grid-area: next-button;
	justify-self: flex-end;
	max-width: fit-content;
`;
export const MonthTitle = styled.h4`
	grid-area: month-title;
`;
export const DayTitle = styled.p`
	grid-row: 2;
`;
