import Modal from "react-bootstrap/Modal";

export default ({ state, setState }) => {
	return (
		<Modal show={!!state} onHide={setState.bind(null, null)}>
			<Modal.Header closeButton>
				<Modal.Title>Error</Modal.Title>
			</Modal.Header>
			<Modal.Body>{state?.toString()}</Modal.Body>
		</Modal>
	);
};
