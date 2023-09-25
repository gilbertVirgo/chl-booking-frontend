import media from "../media";
import styled from "styled-components";
import theme from "../theme";

const Wrapper = styled.section`
	margin-bottom: ${theme.gutter}px;

	${media.minWidth("l")`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
		margin-bottom: ${theme.gutter * 2}px;
	`}

	border-bottom: 0.5px solid lightgrey;
`;

export default ({ children, aside }) => (
	<Wrapper>
		<h2>{children}</h2>
		{aside && <aside>{aside}</aside>}
	</Wrapper>
);
