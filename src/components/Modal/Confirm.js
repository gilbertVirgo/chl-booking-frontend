import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Spinner from "../Spinner";

export default ({ state = {}, setState }) => {
	const [loading, setLoading] = React.useState(false);

	const handleCancel = () => setState({});
	const handleConfirm = () => {
		setLoading(true);

		Promise.resolve(state?.onConfirm()).then(() => {
			setState({});
			setLoading(false);
		});
	};

	return (
		<Modal show={state?.prompt} onHide={handleCancel}>
			<Modal.Body>{state?.prompt}</Modal.Body>
			<Modal.Footer
				style={{ justifyContent: "flex-end", columnGap: `5px` }}
			>
				<Button
					disabled={loading}
					variant="secondary"
					onClick={handleCancel}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					variant={state?.dangerous ? "danger" : "primary"}
					onClick={handleConfirm}
				>
					{loading ? (
						<Spinner as="span" size="sm" />
					) : (
						state?.confirmButtonText || "OK"
					)}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
