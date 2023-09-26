import { Link, useHistory } from "react-router-dom";

import BookingCard from "../../../components/BookingCard";
import Container from "react-bootstrap/Container";
import GlobalContext from "../../../GlobalContext";
import Grid from "../../../components/Grid";
import PageTitle from "../../../components/PageTitle";
import React from "react";
import Stack from "react-bootstrap/Stack";
import get from "../../../api/get";
import theme from "../../../theme";

export default () => {
	const history = useHistory(),
		reload = () => history.go(0);

	const [bookings, setBookings] = React.useState([]),
		[nextPage, setNextPage] = React.useState(),
		[pageNumber, setPageNumber] = React.useState(0),
		{ setError, setLoading } = React.useContext(GlobalContext);

	const getBookings = (p) =>
		get(`/bookings/page/${p}`, { archived: false })
			.then(({ data: { docs, nextPage } }) => {
				setNextPage(nextPage);
				setBookings((bookings) => [...bookings, ...docs]);
			})
			.catch(({ message }) => setError(message));

	React.useEffect(() => {
		setLoading(true);
		getBookings(pageNumber).finally(() => setLoading(false));
	}, [pageNumber]);

	return (
		!!bookings.length && (
			<Container>
				<PageTitle>Cards</PageTitle>
				<Stack gap={5}>
					<Grid>
						{bookings.map((booking, k) => (
							<BookingCard
								key={k}
								booking={booking}
								onChange={reload}
							/>
						))}
					</Grid>

					{nextPage && (
						<section
							style={{
								display: "flex",
								justifyContent: "center",
								marginBottom: `${theme.gutter}px`,
							}}
						>
							<Link
								to="#"
								onClick={() => setPageNumber(nextPage)}
							>
								Load more
							</Link>
						</section>
					)}
				</Stack>
			</Container>
		)
	);
};
