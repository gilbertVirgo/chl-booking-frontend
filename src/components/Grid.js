import media from "../media";
import styled from "styled-components";

export default styled.div`
	display: grid;
	column-gap: ${({ theme }) => theme.gutter}px;
	row-gap: ${({ theme }) => theme.gutter}px;

	${media.minWidth("s")`
        grid-template-columns: 1fr;
    `}

	${media.minWidth("l")`
        grid-template-columns: 1fr 1fr;
    `}

    ${media.minWidth("xl")`
        grid-template-columns: 1fr 1fr 1fr;
    `}
`;
