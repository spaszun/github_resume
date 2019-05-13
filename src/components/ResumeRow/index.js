import React from "react";

export const ResumeRow = ({ title, children, isLoading }) => {
  const withLoading = children => {
    if (!isLoading) return children;

    return <p>Loading...</p>;
  };

  return (
    <div>
      <div>
        <h2>{title}</h2>
      </div>
      <div>{withLoading(children)}</div>
    </div>
  );
};
