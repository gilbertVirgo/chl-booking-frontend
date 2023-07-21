import Modal from "react-bootstrap/Modal";

export default ({ state, setState }) => {
	return (
		<Modal show={!!state} onHide={setState.bind(null, null)}>
			<Modal.Body>{state}</Modal.Body>
		</Modal>
	);
};
