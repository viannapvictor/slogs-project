import styled from 'styled-components';
import { FaRegHeart } from 'react-icons/fa';

export default function Footer(): JSX.Element {
    return (
        <>
            <StyledFooter>
                <p>&copy; 2023 Slogs</p>
                <p>
                    Made with <FaRegHeart fill="#8789fe" /> by <strong>Slogs Team</strong>
                </p>
            </StyledFooter>
        </>
    );
}

const StyledFooter = styled.footer`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-area: footer;
    transition: background-color 0.25s linear;
    background-color: ${(props) => props.theme.footer.background};
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
`;
