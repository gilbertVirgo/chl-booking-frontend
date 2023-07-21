import Table from "react-bootstrap/Table";
import styled from "styled-components";

export default styled(Table)`
	tbody:empty::after {
		content: "No results";
	}
`;
