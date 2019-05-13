import React from "react";

export const Footer = ({ user, githubNick }) => (
  <footer>
    <p>
      {user.name + " - "}
      {user.email && (
        <React.Fragment>
          <a href={`mailto:${user.email}`}>{user.email}</a> -{" "}
        </React.Fragment>
      )}
      {user.website && (
        <React.Fragment>
          <a href={user.website} title={`${user.name}'s website`}>
            {user.website}
          </a>{" "}
          -{" "}
        </React.Fragment>
      )}
      <a
        href={`https://github.com/${githubNick}`}
        title="GitHub profile"
      >{`https://github.com/${githubNick}`}</a>
    </p>
  </footer>
);
