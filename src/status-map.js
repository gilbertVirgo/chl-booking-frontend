import {
	faCheckCircle,
	faEnvelope,
	faEnvelopeOpen,
	faMinusCircle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export default {
	unconfirmed: {
		icon: faEnvelope,
		color: "#ffc107",
		secondaryColor: "#212529",
		title: "Unconfirmed",
	},
	confirmed: {
		icon: faCheckCircle,
		color: "#28a745",
		title: "Confirmed",
	},
	engaging: {
		icon: faEnvelopeOpen,
		color: "#007bff",
		title: "Currently engaging",
	},
	rejected: {
		icon: faXmarkCircle,
		color: "#dc3545",
		title: "Rejected",
	},
	redundant: {
		icon: faMinusCircle,
		color: "#6c757d",
		title: "Redundant",
	},
};
