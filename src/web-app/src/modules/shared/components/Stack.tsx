import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    direction?: DirectionType;
    justifyContent?: JustifyContentType;
    alignItems?: AlignItemsType;
    alignContent?: AlignContentType;
    spacing?: string | number;
    component?: keyof JSX.IntrinsicElements;
}

type DirectionType = 'column' | 'row' | 'row-reverse' | 'column-reverse';
type JustifyContentType =
    | CommonAttributes
    | 'left'
    | 'right'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
type AlignItemsType = CommonAttributes | 'normal' | 'self-end' | 'self-start';
type AlignContentType =
    | CommonAttributes
    | 'normal'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
type CommonAttributes =
    | 'baseline'
    | 'center'
    | 'end'
    | 'first baseline'
    | 'flex-end'
    | 'flex-start'
    | 'last baseline'
    | 'safe'
    | 'start'
    | 'stretch'
    | 'unsafe'
    | 'inherit'
    | 'initial'
    | 'unset';

export default function Stack({
    direction = 'column',
    justifyContent = 'flex-start',
    alignItems = 'stretch',
    alignContent = 'normal',
    spacing = '0px',
    component = 'div',
    ...attributes
}: Props): JSX.Element {
    if (typeof spacing === 'number') spacing = `${spacing * 8}px`;

    return (
        <FlexElement
            data-testid="stack-component"
            as={component}
            $direction={direction}
            $justifyContent={justifyContent}
            $alignItems={alignItems}
            $alignContent={alignContent}
            $spacing={spacing}
            {...attributes}
        />
    );
}

const FlexElement = styled.div<{
    $direction: string;
    $justifyContent: string;
    $alignItems: string;
    $alignContent: string;
    $spacing: string;
}>`
    display: flex;
    flex-direction: ${(props) => props.$direction};
    justify-content: ${(props) => props.$justifyContent};
    align-items: ${(props) => props.$alignItems};
    gap: ${(props) => props.$spacing};
`;
