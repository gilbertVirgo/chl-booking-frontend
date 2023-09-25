import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import handleArchiveBooking from "../helpers/handleArchiveBooking";

export default (setConfirm) => ({
	children: <FontAwesomeIcon icon={faArchive} />,
	variant: "secondary",
	onClick: function () {
		setConfirm({
			prompt: "Are you sure you want to archive this booking? (This will hide this booking card from view on the bookings page)",
			dangerous: true,
			confirmButtonText: "Yes",
			onConfirm: handleArchiveBooking.bind(null, ...arguments),
		});
	},
});
