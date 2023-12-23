import { AiOutlineLeftCircle } from 'react-icons/ai';
import styled from 'styled-components';
import SidebarDiv from './SidebarDiv';
import { Stack } from '../../../../shared/components/slogs-components';

interface Props {
    detailed: boolean;
    changeDetailed: () => void;
}

export default function SidebarHeader({ detailed, changeDetailed }: Props): JSX.Element {
    return (
        <SidebarDiv
            $detailed={detailed}
            draggable="false"
            direction="row"
            justifyContent={detailed ? 'start' : 'center'}
        >
            <Stack direction="row" alignItems="center" spacing={1}>
                <img draggable="false" src="logo.png" width={30} height={30} />
                {detailed && <SidebarLogoText>Slogs</SidebarLogoText>}
            </Stack>
            <DetailedButton
                id="detailed-button"
                size={25}
                $detailed={detailed}
                onClick={() => {
                    changeDetailed();
                }}
            />
        </SidebarDiv>
    );
}

const SidebarLogoText = styled.h3`
    color: #8789fe;
    user-select: none;
`;

const DetailedButton = styled(AiOutlineLeftCircle)<{ $detailed: boolean }>`
    position: absolute;
    right: -14px;
    top: 12px;
    cursor: pointer;
    transition: all 0.5s ease;
    ${(props) => !props.$detailed && 'transform: rotate(180deg);'}
    color: ${(props) => props.theme.menu.detailedButtonColor};
`;
