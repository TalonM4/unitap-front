import styled from 'styled-components/';
import { DV } from 'components/basic/designVariables';
import * as React from 'react';
import Icon from '../Icon/Icon';
import Label from '../Lable/label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  iconWidth?: string;
  iconHeight?: string;
  icon?: string;
  label?: string;
  postfix?: string;
  styleType?: string;
  fontSize?: string;
  pl?: number;
  testid?: string;
}

const RawInput = styled.input<InputProps>`
  padding: ${DV.sizes.basePadding * 1.5}px;
  padding-left: ${({ pl }) => (pl ? DV.sizes.basePadding * pl : DV.sizes.basePadding * 1.5)}px;
  width: ${({ width }) => width || 'auto'};
  width: 100%;
  color: white;
  background: ${({ styleType }) => (styleType === 'success' ? DV.colors.darkgreen : DV.colors.dark)};
  border-radius: ${DV.sizes.baseRadius}px;
  border: 1px solid ${({ styleType }) => (styleType === 'success' ? DV.colors.green : 'unset')};
  z-index: 1;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '1em')};

  ::placeholder {
    color: ${({ styleType }) => (styleType === 'success' ? DV.colors.placeholderGreen : DV.colors.placeholderGray)};
  }

  :-ms-input-placeholder {
    color: ${({ styleType }) => (styleType === 'success' ? DV.colors.placeholderGreen : DV.colors.placeholderGray)};
  }

  ::-ms-input-placeholder {
    color: ${({ styleType }) => (styleType === 'success' ? DV.colors.placeholderGreen : DV.colors.placeholderGray)};
  }
`;

const InputWrapper = styled.div<InputProps>`
  /* padding: ${DV.sizes.basePadding * 2}px ${DV.sizes.basePadding * 4}px; */
  width: ${({ width }) => width || 'auto'};
  display: flex;
  flex-direction: column;
  color: white;
  border-radius: ${DV.sizes.baseRadius}px;
  margin-bottom: 1rem;
  position: relative;
  height: auto;

  .input-icon {
    position: absolute;
    left: ${DV.sizes.basePadding * 2}px;
    bottom: 50%;
    transform: translateY(50%);
    z-index: 10;
  }

  .input-postfix {
    position: absolute;
    right: ${DV.sizes.basePadding * 4}px;
    bottom: 20%;

    font-size: 12px;
    color: ${DV.colors.space_green};

    z-index: 1;
  }
`;

const Input = (props: InputProps) => {
  const { icon, width, iconWidth, iconHeight, postfix, label, testid } = props;
  return (
    <InputWrapper width={width}>
      {label && <Label>{label}</Label>}
      {icon && <Icon iconSrc={icon} width={iconWidth} height={iconHeight} className="input-icon" />}
      <RawInput data-testid={testid} {...props} />
      {postfix && <p className="input-postfix">{postfix}</p>}
    </InputWrapper>
  );
};

export default Input;
