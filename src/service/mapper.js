export const repositoryToDto = repo => ({
  language: repo.language,
  popularity: repo.watchers + repo.forks,
  name: repo.name,
  since: new Date(repo.created_at).getFullYear(),
  until: new Date(repo.pushed_at).getFullYear(),
  description: repo.description,
  homepage: repo.homepage,
  watchers: repo.watchers,
  forks: repo.forks,
  fork: repo.fork
});

export const contributionsToDto = con => {
  const repoUrl = con.repo.replace(
    /https:\/\/api\.github\.com\/repos/,
    "https://github.com"
  );
  const repoName = con.repo.replace(/https:\/\/api\.github\.com\/repos\//, "");
  return { repoUrl, repoName, count: con.count };
};

export const userToDto = (user, githubNick) => {
  const sinceDate = new Date(user.created_at);
  const sinceYear = sinceDate.getFullYear();
  const sinceMonth = sinceDate.getMonth();
  const earlyAdopter =
    (sinceYear === 2008 && sinceMonth <= 5) || sinceYear <= "2007";
  return {
    name: user.name || githubNick,
    earlyAdopter,
    sinceYear,
    loaction: user.location,
    publicRepos: user.public_repos,
    followers: user.followers,
    website:
      user.blog &&
      `${user.blog.indexOf("http") > -1 ? "" : "http://"}${user.blog}`
  };
};
