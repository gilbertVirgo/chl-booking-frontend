import Spinner from "react-bootstrap/Spinner";

export default (props) => (
	<Spinner animation="border" role="status" {...props}>
		<span className="visually-hidden">Loading...</span>
	</Spinner>
);
