import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import theme from "../theme";

export default () => (
	<Navbar expand="lg" style={{ marginBottom: `${theme.gutter}px` }}>
		<Container>
			<Navbar.Brand href="/">CHL Booking System</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Nav className="me-auto">
					<Nav.Link href="/bookings">Bookings</Nav.Link>
					<Nav.Link href="/customers">Customers</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
);
