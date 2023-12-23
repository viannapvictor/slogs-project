import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: SizeType;
}

type SizeType = 'small' | 'large' | 'inherit';

export default function IconButton({ size = 'large', ...attributes }: Props): JSX.Element {
    const fontSize = getFontSize(size);
    return <StyledIconButton draggable="false" size={fontSize} {...attributes} />;
}

function getFontSize(size: SizeType): string {
    switch (size) {
        case 'large':
            return '1.75rem';
        case 'small':
            return '1.125rem';
        case 'inherit':
            return 'inherit';
    }
}

const StyledIconButton = styled.button<{ size: string }>`
    display: flex;
    border-radius: 50%;
    border: 1px solid transparent;
    cursor: pointer;
    background-color: transparent;
    padding: 8px;
    font-size: ${(props) => props.size};
    transition: background-color 0.25s ease;
    user-select: none;

    &:hover {
        background-color: #ffffff10;
    }

    @media (prefers-color-scheme: light) {
        &:hover {
            background-color: #00000010;
        }
    }
`;
