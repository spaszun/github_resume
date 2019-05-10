import React from "react";
import set from "./set";
import styled, { withTheme } from "styled-components";
import PropTypes from "prop-types";

const Icon = props => {
  const { name, width, height, fill, className, theme, ...rest } = props;
  const Component = set.find(icon => icon.name === name).component;

  return (
    <span className={className}>
      <Component
        {...rest}
        width={width || "1em"}
        height={height || "1em"}
        fill={fill || theme.colorWhite}
        className={className}
      />
    </span>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  theme: PropTypes.object.isRequired
};

const StyledIcon = styled(withTheme(Icon))`
  display: flex;
  margin: 2px;
`;

export default StyledIcon;
