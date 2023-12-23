import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineMenu } from 'react-icons/md';
import { useAuth } from '../../../shared/hooks/api-hooks';
import { Button, IconButton } from '../../../shared/components/slogs-components';

interface Props {
    showAuthButtons: boolean;
    onMenuOpen: () => void;
}

export default function Header({ showAuthButtons, onMenuOpen }: Props): JSX.Element {
    const { authenticated } = useAuth();
    return (
        <StyledHeader>
            <MenuButton onClick={onMenuOpen}>
                <MdOutlineMenu />
            </MenuButton>

            {showAuthButtons && !authenticated && (
                <>
                    <Link draggable="false" to="/signin">
                        <Button variant="text">Login</Button>
                    </Link>
                    <Link draggable="false" to="/signup">
                        <Button variant="outlined">Registrar-se</Button>
                    </Link>
                </>
            )}
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    grid-area: header;
    position: sticky;
    top: 0;
    padding: 0px 20px;
    background-color: ${(props) => props.theme.header.background};
    transition: background-color 0.25s linear;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
`;

const MenuButton = styled(IconButton)`
    color: inherit;
    position: absolute;
    left: 5px;
    top: 2px;

    @media only screen and (min-width: 769px) {
        display: none;
    }
`;
