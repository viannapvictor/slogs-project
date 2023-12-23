import styled from 'styled-components';
import { Stack } from '../../../../shared/components/slogs-components';

const SidebarDiv = styled(Stack)<{ $detailed: boolean }>`
    height: 100%;

    li {
        ${(props) =>
            !props.$detailed &&
            `
            display: flex;
            justify-content: center;
        `}
    }
`;

export default SidebarDiv;
