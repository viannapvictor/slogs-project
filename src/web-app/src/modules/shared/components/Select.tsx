import React, { useState, forwardRef } from 'react';
import styled, { DefaultTheme, type StyledComponent }  from 'styled-components';

interface Option {
  label: string;
  value: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  variant?: SelectVariant;
  fullWidth?: boolean;
  width?: string | number;
}

interface SelectComponents {
  Select: StyledComponent<'select', any, Record<string, unknown>, never>;
  Option: StyledComponent<"option", DefaultTheme, {}, never>
}

type SelectVariant = 'outlined' | 'filled' | 'standard';

const Select = forwardRef(
  (
    {
      options,
      width,
      className,
      variant = 'outlined',
      fullWidth = false,
      ...attributes
    }: Props,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const { onChange: attributesOnChange, ...otherAttributes } = attributes;

    const [selectedValue, setSelectedValue] = useState<string | undefined>(
      options[0].value || ''
    );
    const CurrentComponents = getStyledVariants(variant);
    
    const handleChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
      setSelectedValue(event.target.value);
      if (attributes.onChange) attributes.onChange(event);
    };

    return (
      <SelectContainer
        className={className}
        $width={typeof width === 'number' ? `${width}px` : width}
        $fullWidth={fullWidth}
      >
        <CurrentComponents.Select
          ref={ref}
          value={selectedValue}
          onChange={handleChange}
          {...otherAttributes}
          >
          {options.map((option, index) => (
            <CurrentComponents.Option key={index} value={option.value}>
              {option.label}
            </CurrentComponents.Option>
          ))}
        </CurrentComponents.Select>
      </SelectContainer>
    );
  }
);

function getStyledVariants(variant: SelectVariant): SelectComponents {
  switch (variant) {
    case 'outlined':
      return { Select: OutlinedSelect, Option: OutlinedOption };
    case 'filled':
      return { Select: FilledSelect, Option: FilledOption };
    case 'standard':
      return { Select: StandardSelect, Option: StandardOption };
  }
}

const SelectContainer = styled.div<{
  $fullWidth: boolean;
  $width: string | undefined;
}>`
  position: relative;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  ${(props) =>
    props.$fullWidth ? 'width: 100%;' : props.$width !== undefined && `width: ${props.$width};`}
`;

const SelectBase = styled.select<{
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

const OutlinedSelect = styled(SelectBase)`
  outline: 1px solid ${(props) => props.theme.select.outlined.outline};
  border-radius: 6px;
  padding: 14px 32px 14px 14px;

  &:focus {
    outline: 2px solid ${(props) => props.theme.select.outlined.primary};
  }

  &:hover:not(&:focus) {
    outline: 1px solid ${(props) => props.theme.select.outlined.hover.outline};
  }
`;

const FilledSelect = styled(SelectBase)`
  background-color: #8f8ad61f;
  border-bottom: 1px solid #ffffffbe;
  border-radius: 6px 6px 0px 0px;
  padding: 8px 14px 24px 14px;

  &:focus {
    border-bottom: 1px solid #747ad4e4;
    background-color: #756ed83d;
  }

  &:hover:not(&:focus) {
    background-color: #8f8ad63e;
  }
`;

const StandardSelect = styled(SelectBase)`
  border-bottom: 1px solid #ffffffbe;
  padding: 6px 0px 26px 0px;

  &:focus {
    border-bottom: 2px solid #8289ebe3;
  }

  &:hover:not(&:focus) {
    border-bottom: 2px solid #ffffffea;
  }
`;

const GenericOption = styled.option`
  padding: 8px;
  font-size: 14px;
  color: inherit;
  background-color: inherit;
`;

const OutlinedOption = styled(GenericOption)`
  padding: 8px;
  color: ${(props) => props.theme.select.outlined.option.color};
  background-color: ${(props) => props.theme.select.outlined.option.backgroundColor};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.select.outlined.option.hoverBackgroundColor};
  }

  &:selected {
    background-color: ${(props) => props.theme.select.outlined.option.selectedBackgroundColor};
  }
`;

const FilledOption = styled(GenericOption)`
  padding: 8px;
  color: ${(props) => props.theme.select.filled.option.color};
  background-color: ${(props) => props.theme.select.filled.option.backgroundColor};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.select.filled.option.hoverBackgroundColor};
  }

  &:selected {
    background-color: ${(props) => props.theme.select.filled.option.selectedBackgroundColor};
  }
`;

const StandardOption = styled(GenericOption)`
  padding: 8px;
  color: ${(props) => props.theme.select.standard.option.color};
  background-color: ${(props) => props.theme.select.standard.option.backgroundColor};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.select.standard.option.hoverBackgroundColor};
  }

  &:selected {
    background-color: ${(props) => props.theme.select.standard.option.selectedBackgroundColor};
  }
`;



export default Select;
