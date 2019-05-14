import React from "react";
import PropTypes from "prop-types";

export const Languages = ({ languages }) => (
  <React.Fragment>
    <ul>
      {languages.map(l => (
        <li key={l.language}>
          {l.language} {l.percentage} %
        </li>
      ))}
    </ul>
  </React.Fragment>
);

Languages.propTypes = {
  languages: PropTypes.array.isRequired
};
