import { default as BSButton } from "react-bootstrap/Button";
import Spinner from "./Spinner";

export default ({ loading, children, ...props }) => (
	<BSButton {...props} style={{ cursor: loading ? "progress" : "pointer" }}>
		{loading ? <Spinner size="sm" /> : children}
	</BSButton>
);
