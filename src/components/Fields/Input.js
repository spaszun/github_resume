import React from "react";
import { Input, FieldWrapper } from "./";
import PropTypes from "prop-types";

const InputField = props => {
  const {
    placeholder,
    input,
    label,
    description,
    type,
    meta: { touched, error },
    ...rest
  } = props;
  return (
    <FieldWrapper
      label={label}
      description={description}
      touched={touched}
      error={error}
    >
      <Input
        {...rest}
        {...input}
        type={type}
        placeholder={placeholder}
        error={touched && error}
      />
    </FieldWrapper>
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

export default InputField;
