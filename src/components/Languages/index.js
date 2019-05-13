import React from "react";

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
