import React from "react";

export const Repositories = ({ repositories, githubNick }) => (
  <React.Fragment>
    {repositories.map((r, i) => (
      <div key={i}>
        <h2>
          <a href={`https://github.com/${githubNick}/${r.name}`}>{r.name}</a>
        </h2>
        <h3> {r.language ? r.language + " - " : ""} Creator &amp; Owner</h3>
        <h4>
          {r.since} {r.since !== r.until ? ` - ${r.until}` : ""}
        </h4>
        <p>
          {r.description} {r.homepage && <a href={r.homepage}> {r.homepage}</a>}
        </p>
        <p>
          This repository has {r.watchers} watcher(s) and {r.forks} fork(s). If
          you would like more information about this repository and my
          contributed code, please visit{" "}
          {<a href={`https://github.com/${githubNick}/${r.name}`}>the repo</a>}{" "}
          on GitHub.
        </p>
      </div>
    ))}
  </React.Fragment>
);
