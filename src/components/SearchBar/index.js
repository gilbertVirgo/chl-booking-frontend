import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
	return (
		<InputGroup className="mb-3">
			<Form.Control placeholder="Search" {...props} />
			<InputGroup.Text id="basic-addon1">
				<FontAwesomeIcon icon={faSearch} />
			</InputGroup.Text>
		</InputGroup>
	);
};
