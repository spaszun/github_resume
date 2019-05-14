import React from "react";
import PropTypes from "prop-types";

export const Organizations = ({ organizations }) => (
  <React.Fragment>
    {organizations.map(o => (
      <div key={o.name}>
        <h2>{o.name}</h2>
        <h3>Member</h3>
        <h4>{o.now}</h4>
        <p>
          If you would like more information about this organization, please
          visit{" "}
          <a href={`https://github.com/${o.name}`}>the organization page</a> on
          GitHub.
        </p>
      </div>
    ))}
  </React.Fragment>
);

Organizations.propTypes = {
  organizations: PropTypes.array.isRequired
};
