import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardBody } from "../../pages/Bookings/Cards/styles";
import DetailsTable from "./components/DetailsTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../GlobalContext";
import ManualSelect from "./components/ManualSelect";
import React from "react";
import Subtext from "../Subtext";
import ToDoTable from "./components/ToDoTable";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import parseDate from "../../helpers/parseDate";
import patch from "../../api/patch";
import timeAgo from "../../time-ago";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default ({ onChange, confirmFor, booking, onHide, ...p }) => {
	const history = useHistory(),
		reload = () => history.go(0);

	const { index, archived, created_at, status } = booking;

	const { setHighlight, setConfirm, setError } =
		React.useContext(GlobalContext);

	const handleArchive = () => {
		if (onHide) onHide();

		setConfirm({
			prompt: "Are you sure you want to archive this booking? (This will hide this booking card from view, but you'll still be able to see it from within the customer's booking history.)",
			dangerous: true,
			confirmButtonText: "Yes",
			onConfirm: patch
				.bind(null, `/booking/${index}`, { archived: true })
				.then(reload)
				.catch(setError),
		});
	};

	return (
		<Card bg={status === "unconfirmed" && "warning"} {...p}>
			<CardBody style={{ position: "relative" }}>
				<ManualSelect {...{ booking, onChange, confirmFor }} />
				<DetailsTable {...booking} />
				{status === "confirmed" && (
					<ToDoTable {...{ booking, onChange }} />
				)}
			</CardBody>
			<Card.Footer style={{ display: "flex" }}>
				<Subtext style={{ flex: 1 }}>
					Requested {timeAgo.format(parseDate(created_at))}
				</Subtext>

				{archived ? (
					<Subtext>(Archived)</Subtext>
				) : (
					<Button
						variant="secondary"
						onClick={handleArchive}
						style={{ marginLeft: "5px" }}
						size="sm"
					>
						<FontAwesomeIcon icon={faArchive} />
					</Button>
				)}
			</Card.Footer>
		</Card>
	);
};
