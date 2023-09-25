import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import handleFollowUpBooking from "../helpers/handleFollowUpBooking";

export default (setConfirm) => ({
	children: <FontAwesomeIcon icon={faReply} />,
	variant: "primary",
	onClick: function () {
		setConfirm({
			prompt: "Are you sure you want to follow-up this booking? (This will open up your mail client)",
			confirmButtonText: "Yes",
			onConfirm: handleFollowUpBooking.bind(null, ...arguments),
		});
	},
});
