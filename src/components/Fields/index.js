import React from "react";
import styled from "styled-components";
import Color from "color";

export const InputLabel = styled.label`
  color: ${({ theme }) => theme.colorBlue};
  display: block;
  font-weight: 800;
  margin-bottom: 10px;
`;

const red = theme => Color(theme.colorRed).toString();

export const Input = styled.input`
  display: inline-block;
  padding: 0.5rem 0;
  border-radius: 3px;
  width: 20rem;
  background: transparent;
  color: black;
  border: ${({ theme, error }) => `2px solid ${error ? red(theme) : "black"}`};
  &:focus {
    outline: none;
  }
`;

export const Description = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colorGray};
`;

export const FieldError = styled.div`
  margin-top: 1px;
  color: ${({ theme }) => red(theme)};
  text-align: ${({ textAlign }) => textAlign};
`;

export const FieldWrapper = ({
  children,
  label,
  description,
  touched,
  error
}) => (
  <div>
    {label && <InputLabel>{`${label}:`}</InputLabel>}
    {children}
    {description && <Description>{description}</Description>}
    {touched && error && <FieldError>{error}</FieldError>}
  </div>
);

export { default as InputField } from "./Input";
