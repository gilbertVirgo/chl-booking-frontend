import { Link } from "react-router-dom";

export default ({ index, firstname, lastname, email }) => (
	<tr>
		<td>
			<Link to={`/customer/${index}`}>
				{firstname} <strong>{lastname}</strong>
			</Link>
		</td>
		<td>{email}</td>
	</tr>
);
