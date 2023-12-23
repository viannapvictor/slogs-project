import styled from 'styled-components';

interface Props {
    children: any;
}

export default function Content({ children }: Props): JSX.Element {
    return <ContentStyle>{children}</ContentStyle>;
}

const ContentStyle = styled.main`
    grid-area: main;
    padding: 15px 24px;
    background-color: ${(props) => props.theme.content.background};
    transition: background-color 0.25s linear;
`;
