import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import theme from "../theme";

export default () => (
	<Navbar expand="lg" style={{ marginBottom: `${theme.gutter}px` }}>
		<Container>
			<Navbar.Brand href="/">CHL Booking System</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Nav className="me-auto">
					<NavDropdown title="Bookings">
						<NavDropdown.Item href="/bookings/cards">
							Cards view
						</NavDropdown.Item>
						<NavDropdown.Item href="/bookings/calendar?archived=false">
							Calendar view
						</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link href="/customers">Customers</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
);
