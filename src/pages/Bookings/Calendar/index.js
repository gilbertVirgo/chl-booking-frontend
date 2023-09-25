import {
	DayTitle,
	Hero,
	MonthTitle,
	NextButton,
	PrevButton,
	Wrapper,
} from "./styles";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation, useParams } from "react-router-dom";

import Button from "../../../components/Button";
import Container from "react-bootstrap/Container";
import Day from "./components/Day";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalContext from "../../../GlobalContext";
import PageTitle from "../../../components/PageTitle";
import React from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import get from "../../../api/get";
import getAllDaysInRange from "./getAllDaysInRange";
import parsePotentialDates from "../../../helpers/parsePotentialDates";
import queryString from "query-string";
import useButtonLoadingStates from "./useButtonLoadingStates";

dayjs.extend(customParseFormat);

const F = "DD/MM/YYYY";

export default () => {
	const history = useHistory();
	const { search, pathname } = useLocation();

	const { year, month } = useParams();
	const selectedMonth = dayjs().year(year).month(month);

	const { loading, setError, setLoading } = React.useContext(GlobalContext);

	const [bookings, setBookings] = React.useState([]);

	const [buttonLoadingStates, setButtonLoadingState] = useButtonLoadingStates(
		{
			toggleShowArchived: false,
			nextMonth: false,
			prevMonth: false,
		}
	);

	const firstDayOfMonth = selectedMonth.startOf("month").day(),
		lastDayOfMonth = selectedMonth.endOf("month").day();

	const dayA = selectedMonth
			.startOf("month")
			.subtract(firstDayOfMonth, "day"),
		dayZ = selectedMonth.endOf("month").add(7 - lastDayOfMonth, "day");

	const handleChangeMonth = (mod) => {
		setButtonLoadingState({ [mod > 0 ? "nextMonth" : "prevMonth"]: true });

		const newMonth = selectedMonth.add(mod, "month");
		history.push(
			`/bookings/calendar/${newMonth.year()}/${newMonth.month()}?archived=false`
		);
	};

	const getBookings = (search) =>
		get(
			`/bookings/range/${encodeURIComponent(
				dayA.format(F)
			)}/${encodeURIComponent(dayZ.format(F))}`,
			queryString.parse(search)
		)
			.then(({ data }) => setBookings(data))
			.catch(({ message }) => setError(message));

	React.useEffect(() => {
		getBookings(search).finally(
			setButtonLoadingState.bind(null, {
				nextMonth: false,
				prevMonth: false,
			})
		);
	}, [month]);

	const archivedBookingsHidden =
		queryString.parse(search).archived !== "false";

	const handleChangeShowArchived = () => {
		let searchString = archivedBookingsHidden ? "?archived=false" : "";

		history.push(pathname + searchString);

		setButtonLoadingState({ toggleShowArchived: true });
		getBookings(searchString).finally(
			setButtonLoadingState.bind(null, { toggleShowArchived: false })
		);
	};

	React.useEffect(() => {
		console.log(buttonLoadingStates);
	}, [buttonLoadingStates]);

	return (
		!loading && (
			<Container>
				<PageTitle
					aside={
						<Button
							size="sm"
							variant="secondary"
							onClick={handleChangeShowArchived}
							loading={buttonLoadingStates.toggleShowArchived}
						>
							{archivedBookingsHidden ? "Hide" : "Show"} archived
							bookings
						</Button>
					}
				>
					Bookings | Calendar
				</PageTitle>
				<Hero>
					<PrevButton
						loading={buttonLoadingStates.prevMonth}
						onClick={handleChangeMonth.bind(null, -1)}
					>
						<FontAwesomeIcon icon={faChevronLeft} />
					</PrevButton>
					<NextButton
						loading={buttonLoadingStates.nextMonth}
						onClick={handleChangeMonth.bind(null, +1)}
					>
						<FontAwesomeIcon icon={faChevronRight} />
					</NextButton>
					<MonthTitle>{selectedMonth.format("MMMM YYYY")}</MonthTitle>
					{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
						(t) => (
							<DayTitle>{t}</DayTitle>
						)
					)}
				</Hero>
				<Wrapper>
					{getAllDaysInRange(dayA, dayZ).map((date) => (
						<Day
							date={date}
							bookings={bookings.filter(
								({ potential_dates, status, confirmed_date }) =>
									(parsePotentialDates(
										potential_dates
									).includes(date.format(F)) &&
										status !== "confirmed") ||
									confirmed_date === date.format(F)
							)}
						/>
					))}
				</Wrapper>
			</Container>
		)
	);
};
