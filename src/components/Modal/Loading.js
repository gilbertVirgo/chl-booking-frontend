import Modal from "react-bootstrap/Modal";
import Spinner from "../Spinner";

export default ({ state }) => {
	return (
		<Modal show={state}>
			<Modal.Body
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					rowGap: "15px",
				}}
			>
				<Spinner />
				<span>Loading</span>
			</Modal.Body>
		</Modal>
	);
};
