import React from "react";
import PropTypes from "prop-types";

export const Website = ({ website, githubNick }) => (
  <React.Fragment>
    <a href={website} id="mywebsite" title={`${githubNick}'s website`}>
      {website}
    </a>
  </React.Fragment>
);

Website.propTypes = {
  website: PropTypes.string.isRequired,
  githubNick: PropTypes.string.isRequired
};
