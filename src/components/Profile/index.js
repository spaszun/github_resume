import React from "react";

export const Profile = ({ user, githubNick }) => {
  const userReposDesc = () => {
    if (user.publicRepos > 0) {
      return (
        <a href={`https://github.com/${githubNick}?tab=repositories`}>{`${
          user.publicRepos
        } public repositor${user.publicRepos > 1 ? "ies" : "y"}`}</a>
      );
    }
    return " without any public repository for now ";
  };

  const userFollowersDesc = () => {
    if (user.followers > 0) {
      return [
        " and ",
        <a href={`https://github.com/${githubNick}/followers`}>{`${
          user.followers
        } follower${user.followers > 1 ? "s" : ""}`}</a>
      ];
    }
    return "";
  };

  return (
    <React.Fragment>
      {`On GitHub ${user.earlyAdopter ? " as an early adopter " : " "} since ${
        user.sinceYear
      } `}
      {user.name} is a developer{" "}
      {user.location && (
        <React.Fragment>
          based in <span>{user.location}</span>
        </React.Fragment>
      )}
      with {userReposDesc()} {userFollowersDesc()}
    </React.Fragment>
  );
};
