import GlobalContext from "../GlobalContext";
import React from "react";
import get from "../api/get";
import { useParams } from "react-router-dom";

export default () => {
	const { setError, setLoading } = React.useContext(GlobalContext);
	const { index } = useParams();
	const [booking, setBooking] = React.useState();

	const getBooking = () =>
		get(`/booking/${index}`).then(setBooking).catch(setError);

	React.useEffect(() => {
		setLoading(true);
		getBooking().finally(() => setLoading(false));
	}, []);

	return <React.Fragment></React.Fragment>;
};
