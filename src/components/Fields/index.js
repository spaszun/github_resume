import React from "react";
import styled from "styled-components";
import Color from "color";

export const InputLabel = styled.label`
  color: ${({ theme }) => theme.colorBlue};
  display: block;
  font-weight: 800;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 20rem;
  background: transparent;
  color: black;
  border: 2px solid black;
  &:focus { 
    outline: none;
  }
`;

export const Description = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colorGray};
`;

export const Error = styled.div`
  margin-top: 10px;
  color: ${({ theme }) =>
    Color(theme.colorRed)
      .lighten(0.2)
      .toString()};
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
    {touched && error && <Error>{error}</Error>}
  </div>
);


export { default as InputField } from "./Input";
