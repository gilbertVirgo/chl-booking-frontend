import Container from "react-bootstrap/Container";
import CustomerRow from "./components/CustomerRow";
import GlobalContext from "../../GlobalContext";
import PageTitle from "../../components/PageTitle";
import React from "react";
import SearchBar from "../../components/SearchBar";
import Stack from "react-bootstrap/Stack";
import Table from "../../components/Table";
import byLastname from "./helpers/sort/byLastname";
import bySearchValue from "./helpers/filter/bySearchValue";
import get from "../../api/get";

export default () => {
	const [customers, setCustomers] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const { setError, setLoading } = React.useContext(GlobalContext);

	const getCustomers = () =>
		get("/customers")
			.then(({ data }) => setCustomers(data))
			.catch(({ message }) => setError(message));

	React.useEffect(() => {
		setLoading(true);
		getCustomers().finally(() => setLoading(false));
	}, []);

	return (
		!!customers.length && (
			<Container>
				<PageTitle>Customers</PageTitle>
				<Stack gap={2}>
					<SearchBar
						value={searchValue}
						onChange={({ target: { value } }) =>
							setSearchValue(value)
						}
						readOnly={!customers.length}
					/>
					<Table striped bordered>
						<tbody>
							{customers
								.filter(bySearchValue.bind(null, searchValue))
								.sort(byLastname)
								.map((props) => (
									<CustomerRow {...props} />
								))}
						</tbody>
					</Table>
				</Stack>
			</Container>
		)
	);
};
