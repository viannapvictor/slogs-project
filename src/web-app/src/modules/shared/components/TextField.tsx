import { type ChangeEvent, useState, forwardRef, type ForwardedRef } from 'react';

import styled, { type StyledComponent } from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    fullWidth?: boolean;
}

interface TextFieldComponents {
    Input: StyledComponent<'input', any, Record<string, unknown>, never>;
    Legend: StyledComponent<'legend', any, { $hasValue: boolean }, never>;
}

type InputVariant = 'outlined' | 'filled' | 'standard';

const TextField = forwardRef(
    (
        {
            placeholder,
            onChange,
            width,
            className,
            variant = 'outlined',
            fullWidth = false,
            ...attributes
        }: Props,
        ref: ForwardedRef<unknown>
    ) => {
        const [hasValue, setHasValue] = useState(false);
        const CurrentComponents = getStyledVariants(variant);

        return (
            <Field
                className={className}
                $width={typeof width === 'number' ? `${width}px` : width}
                $fullWidth={fullWidth}
            >
                <CurrentComponents.Input
                    ref={ref}
                    fullWidth={fullWidth}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setHasValue(e.target.value.length > 0);
                        if (onChange != null) onChange(e);
                    }}
                    {...attributes}
                />
                <CurrentComponents.Legend $hasValue={hasValue}>
                    {placeholder}
                </CurrentComponents.Legend>
            </Field>
        );
    }
);

function getStyledVariants(variant: InputVariant): TextFieldComponents {
    switch (variant) {
        case 'outlined':
            return { Input: OutlinedInput, Legend: OutlinedLegend };
        case 'filled':
            return { Input: FilledInput, Legend: FilledLegend };
        case 'standard':
            return { Input: StandardInput, Legend: StandardLegend };
    }
}

const Field = styled.div<{
    $fullWidth: boolean;
    $width: string | undefined;
}>`
    position: relative;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    ${(props) =>
        props.$fullWidth ? 'width: 100%;' : props.$width !== undefined && `width: ${props.$width};`}
`;

const GenericInput = styled.input<{
    $fullWidth: boolean;
}>`
    width: 100%;
    border: 1px solid transparent;
    background-color: transparent;
    color: inherit;
    font: inherit;
    transition: all 0.2s ease;
    ${(props) => props.$fullWidth && 'width: 100%;'}

    &:focus {
        outline: none;
    }
`;

const OutlinedInput = styled(GenericInput)`
    outline: 1px solid ${(props) => props.theme.textField.outlined.outline};
    border-radius: 6px;
    padding: 16px 14px;

    &:focus {
        outline: 2px solid ${(props) => props.theme.textField.outlined.primary};
    }

    &:hover:not(&:focus) {
        outline: 1px solid ${(props) => props.theme.textField.outlined.hover.outline};
    }
`;

const FilledInput = styled(GenericInput)`
    background-color: #8f8ad61f;
    border-bottom: 1px solid #ffffffbe;
    border-radius: 6px 6px 0px 0px;
    padding: 24px 14px 8px 14px;

    &:focus {
        border-bottom: 1px solid #747ad4e4;
        background-color: #756ed83d;
    }

    &:hover:not(&:focus) {
        background-color: #8f8ad63e;
    }
`;

const StandardInput = styled(GenericInput)`
    border-bottom: 1px solid #ffffffbe;
    padding: 26px 0px 6px 0px;

    &:focus {
        border-bottom: 2px solid #8289ebe3;
    }

    &:hover:not(&:focus) {
        border-bottom: 2px solid #ffffffea;
    }
`;

const FieldLegend = styled.legend<{
    $hasValue: boolean;
}>`
    font: inherit;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.2s ease, background-color 0.25s linear;
    user-select: none;
    color: ${(props) => props.theme.textField.legend.color};
    pointer-events: none;
`;

const OutlinedLegend = styled(FieldLegend)`
    transform: translate(15px, 17px);

    ${(props) =>
        props.$hasValue &&
        `
        transform: translate(10px, -10px);
        font-size: 13px;
        background-color: ${props.theme.content.background};
        padding: 0px 6px;
    `}

    ${OutlinedInput}:focus ~ & {
        transform: translate(10px, -10px);
        font-size: 13px;
        background-color: ${(props) => props.theme.content.background};
        padding: 0px 6px;
        color: ${(props) => props.theme.textField.outlined.primary};
    }
`;

const FilledLegend = styled(FieldLegend)`
    transform: translate(15px, 17px);

    ${(props) =>
        props.$hasValue &&
        `
        transform: translate(10px, 4px);
        font-size: 13px;
        padding: 0px 6px;
    `}

    ${FilledInput}:focus ~ & {
        transform: translate(10px, 4px);
        font-size: 13px;
        padding: 0px 6px;
        color: #9a9fe7;
    }
`;

const StandardLegend = styled(FieldLegend)`
    transform: translate(0px, 26px);

    ${(props) =>
        props.$hasValue &&
        `
        transform: translate(-3px, 4px);
        font-size: 13px;
        padding: 0px 6px;
    `}

    ${StandardInput}:focus ~ & {
        transform: translate(-3px, 4px);
        font-size: 13px;
        padding: 0px 6px;
        color: #9a9fe7;
    }
`;

TextField.displayName = 'TextField';
export default TextField;
