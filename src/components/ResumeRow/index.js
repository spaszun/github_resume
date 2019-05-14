import React from "react";
import PropTypes from "prop-types";

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

ResumeRow.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  isLoading: PropTypes.bool
};
