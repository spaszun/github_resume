import React from "react";

export const Contributions = ({ contributions, githubNick }) => (
  <React.Fragment>
    {contributions.map(c => (
      <div className="contributions" key={c.repoName}>
        <h2>
          <a href={c.repoUrl}>{c.repoName}</a>
        </h2>
        <p>
          {githubNick} has contributed for <a href={c.repoUrl}>{c.repoName}</a>{" "}
          with{" "}
          <a href={`${c.repoUrl}/commits?author=${githubNick}`}>
            {c.count} commit(s)
          </a>
        </p>
      </div>
    ))}
  </React.Fragment>
);
