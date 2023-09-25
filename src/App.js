import { Redirect, Route, Switch } from "react-router-dom";

import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings/Cards";
import Calendar from "./pages/Bookings/Calendar";
import Customer from "./pages/Customer";
import Customers from "./pages/Customers";
import GlobalContext from "./GlobalContext";
import Login from "./pages/Login";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import React from "react";
import dayjs from "dayjs";

const App = () => {
	const [error, setError] = React.useState();
	const [highlight, setHighlight] = React.useState();
	const [loading, setLoading] = React.useState(false);
	const [confirm, setConfirm] = React.useState({});

	const today = dayjs();

	return (
		<React.Fragment>
			<NavBar />

			<Modal.Error state={error} setState={setError} />
			<Modal.Confirm state={confirm} setState={setConfirm} />
			<Modal.Loading state={loading} setState={setLoading} />
			<Modal.Highlight state={highlight} setState={setHighlight} />

			{/* Routing */}
			<GlobalContext.Provider
				value={{
					loading,
					setError,
					setHighlight,
					setLoading,
					setConfirm,
				}}
			>
				<Switch>
					<Route path="/bookings/cards" component={Bookings} />
					<Redirect
						exact
						path="/bookings/calendar"
						to={`/bookings/calendar/${today.year()}/${today.month()}?archived=false`}
					/>
					<Route
						path="/bookings/calendar/:year/:month"
						component={Calendar}
					/>
					<Route path="/booking/:index" component={Booking} />
					<Route path="/customers" component={Customers} />
					<Route path="/customer/:index" component={Customer} />
					<Route path="/login" component={Login} />
					<Redirect to="/bookings/cards" />
				</Switch>
			</GlobalContext.Provider>
		</React.Fragment>
	);
};

export default App;
