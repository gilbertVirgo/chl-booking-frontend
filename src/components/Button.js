import { default as BSButton } from "react-bootstrap/Button";
import Spinner from "./Spinner";

export default ({ loading, children, ...props }) => (
	<BSButton {...props}>{loading ? <Spinner size="sm" /> : children}</BSButton>
);
