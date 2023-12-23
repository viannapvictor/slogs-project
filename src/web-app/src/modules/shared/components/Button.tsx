import styled, { type StyledComponent } from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
}

type ButtonVariant = 'contained' | 'outlined' | 'text';

export default function Button({
    variant = 'contained',
    startIcon,
    endIcon,
    children,
    color,
    ...attributes
}: Props): JSX.Element {
    const CurrentButton = getStyledButton(variant);
    return (
        <CurrentButton $color={color} draggable="false" {...attributes}>
            {startIcon}
            {children}
            {endIcon}
        </CurrentButton>
    );
}

function getStyledButton(
    variant: ButtonVariant
): StyledComponent<'button', any, { $color?: string }, never> {
    switch (variant) {
        case 'contained':
            return ContainedButton;
        case 'outlined':
            return OutlinedButton;
        case 'text':
            return TextButton;
    }
}

const GenericButton = styled.button<{
    $color?: string;
}>`
    background-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    border: 1px solid transparent;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    transition: border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease;
    cursor: pointer;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    user-select: none;
    text-transform: uppercase;
`;

const ContainedButton = styled(GenericButton)`
    background-color: ${(props) => props.$color ?? props.theme.button.contained.primary};
    padding: 5px 16px;
    color: white;

    &:hover {
        background-color: ${(props) =>
            (props.$color ?? props.theme.button.contained.primary) + 'aa'};
    }
`;

const OutlinedButton = styled(GenericButton)`
    border: 1px solid ${(props) => props.$color ?? props.theme.button.outlined.primary};
    padding: 5px 16px;
    color: ${(props) => props.theme.button.outlined.primary};

    &:hover {
        border: 1px solid ${(props) => (props.$color ?? props.theme.button.outlined.primary) + 'aa'};
        color: ${(props) => (props.$color ?? props.theme.button.outlined.primary) + 'aa'};
    }
`;

const TextButton = styled(GenericButton)`
    color: ${(props) => props.$color ?? props.theme.button.text.primary};
    padding: 5px 8px;

    &:hover {
        color: ${(props) => (props.$color ?? props.theme.button.text.primary) + 'aa'};
    }
`;
