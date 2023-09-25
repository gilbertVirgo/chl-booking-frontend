import { faArchive, faCheck, faX } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handleArchiveBooking from "../helpers/handleArchiveBooking";
import handleConfirmBooking from "../helpers/handleConfirmBooking";
import handleRejectBooking from "../helpers/handleRejectBooking";

export default (setConfirm) => ({
	children: <FontAwesomeIcon icon={faX} />,
	variant: "danger",
	onClick: function () {
		setConfirm({
			prompt: "Are you sure you want to reject this booking? (This will open up your mail client)",
			dangerous: true,
			confirmButtonText: "Yes",
			onConfirm: handleRejectBooking.bind(null, ...arguments),
		});
	},
});
