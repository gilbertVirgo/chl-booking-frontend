import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const CardBody = styled(Card.Body)`
	td:first-child {
		width: 30px;
		text-align: left;
		vertical-align: top;
	}

	svg {
		color: grey;
	}
`;
