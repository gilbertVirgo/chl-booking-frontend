import BookingCard from "../../components/BookingCard";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import GlobalContext from "../../GlobalContext";
import Grid from "../../components/Grid";
import ImageCard from "./components/ImageCard";
import ImageUpload from "./components/ImageUpload";
import React from "react";
import Stack from "react-bootstrap/Stack";
import Table from "../../components/Table";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import get from "../../api/get";
import patch from "../../api/patch";
import { useParams } from "react-router-dom";

export default () => {
	const { setError, setLoading } = React.useContext(GlobalContext);
	const { index } = useParams();
	const [customer, setCustomer] = React.useState();
	const [bookings, setBookings] = React.useState();
	const [commentsFieldValue, setCommentsFieldValue] = React.useState();
	const [isDirty, setIsDirty] = React.useState(false);

	const getCustomer = () =>
		get(`/customer/${index}`)
			.then(({ data: [customer] }) => setCustomer(customer))
			.catch(setError);

	const getBookings = () =>
		get(`/customer/${index}/bookings`)
			.then(({ data }) => setBookings(data))
			.catch(setError);

	const handleSave = async () => {
		setLoading(true);
		await patch(`/customer/${index}`, { comments: commentsFieldValue });
		await getCustomer();
		setLoading(false);
	};

	const handleDeleteImage = async (url) => {
		let { images } = customer;
		images = images
			.split(",")
			.filter((v) => v !== url)
			.join(",");

		await patch(`/customer/${index}`, {
			images,
		});
		await getCustomer();
		return true;
	};

	React.useEffect(() => {
		setLoading(true);
		getCustomer()
			.then(getBookings)
			.finally(() => setLoading(false));
	}, []);

	React.useEffect(() => {
		if (customer)
			if (customer.hasOwnProperty("comments"))
				setCommentsFieldValue(customer.comments || "");
	}, [customer]);

	React.useEffect(() => {
		if (customer)
			if (customer.hasOwnProperty("comments")) {
				if (customer.comments !== commentsFieldValue) setIsDirty(true);
				else setIsDirty(false);
			} else setCustomer((c) => ({ comments: "", ...c }));
	}, [customer, commentsFieldValue]);

	return (
		customer &&
		bookings && (
			<Container>
				<Stack gap={3}>
					<h1>
						{customer.firstname} {customer.lastname}
					</h1>
					<section>
						<h4>Contact details</h4>
						<Table striped bordered>
							<tbody>
								{["email", "phone"].map((key) => (
									<tr>
										<td>
											<strong>{key}</strong>
										</td>
										<td>{customer[key]}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</section>
					<section>
						<h4>Bookings</h4>
						<Grid>
							{bookings.map((booking) => (
								<BookingCard
									booking={booking}
									onChange={getBookings}
								/>
							))}
						</Grid>
					</section>

					<section>
						<h4>Images</h4>
						<Grid>
							{customer.images &&
								customer.images
									.split(",")
									.filter((v) => !!v) // Eliminates empty image items
									.map((src) => (
										<ImageCard
											src={src}
											onClose={handleDeleteImage}
										/>
									))}
							<ImageUpload
								customerIndex={customer.index}
								multiple
								onChange={getCustomer}
							/>
						</Grid>
					</section>
					<section>
						<h4>Comments</h4>
						<Form.Control
							as="textarea"
							value={commentsFieldValue}
							onChange={({ target: { value } }) =>
								setCommentsFieldValue(value)
							}
						/>
					</section>
					<section
						style={{
							display: "flex",
							justifyContent: "flex-end",
							marginBottom: "30px",
						}}
					>
						<Button disabled={!isDirty} onClick={handleSave}>
							<FontAwesomeIcon icon={faSave} /> Save
						</Button>
					</section>
				</Stack>
			</Container>
		)
	);
};
