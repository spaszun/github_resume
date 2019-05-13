import React from "react";

export const Website = ({ website, githubNick }) => (
  <React.Fragment>
    <a href={website} id="mywebsite" title={`${githubNick}'s website`}>
      {website}
    </a>
  </React.Fragment>
);
