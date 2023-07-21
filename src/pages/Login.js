import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import GlobalContext from "../GlobalContext";
import React from "react";
import Stack from "react-bootstrap/Stack";
import post from "../api/post";
import { useHistory } from "react-router-dom";

export default () => {
	const { setError, setLoading } = React.useContext(GlobalContext);

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (e.target.checkValidity()) {
			setLoading(true);

			post("/login", { email, password })
				.then(({ data }) => {
					window.localStorage.setItem("jwt", data.token);
					history.push("/");
				})
				.catch(({ message }) => setError(message))
				.finally(() => setLoading(false));
		}
	};

	return (
		<React.Fragment>
			<Container>
				<Form onSubmit={handleSubmit}>
					<Stack gap={2}>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control
								required
								type="email"
								value={email}
								onChange={({ target: { value } }) =>
									setEmail(value)
								}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								required
								type="password"
								value={password}
								onChange={({ target: { value } }) =>
									setPassword(value)
								}
							/>
						</Form.Group>

						<Form.Group>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form.Group>
					</Stack>
				</Form>
			</Container>
		</React.Fragment>
	);
};
