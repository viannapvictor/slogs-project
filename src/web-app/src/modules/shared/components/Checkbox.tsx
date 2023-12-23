import { type ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const CheckBox = forwardRef(
    ({ label, id = uuidv4(), ...attributes }: Props, ref: ForwardedRef<unknown>) => {
        return (
            <CheckBoxDiv>
                <StyledCheckBox ref={ref} id={id} type="checkbox" {...attributes} />
                <StyledLabel htmlFor={id}>{label}</StyledLabel>
            </CheckBoxDiv>
        );
    }
);

const CheckBoxDiv = styled.div`
    display: flex;
    cursor: pointer;
`;

const StyledCheckBox = styled.input`
    cursor: pointer;
`;

const StyledLabel = styled.label`
    cursor: pointer;
    padding-left: 10px;
`;

CheckBox.displayName = 'CheckBox';
export default CheckBox;
