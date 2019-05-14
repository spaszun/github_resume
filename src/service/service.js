import _ from "lodash";
import { loadRepositories, loadContributions, loadUser, loadOrgs } from "./api";
import { repositoryToDto, contributionsToDto, userToDto } from "./mapper";

const maxLanguages = 9;
const maxRepos = 5;

const getLanguagesInfo = repositories => {
  const repos = repositories.filter(r => r.language);
  const languagesByOcurrence = _.countBy(repos, "language");
  const languages = Object.keys(languagesByOcurrence).reduce(
    (agg, language) => {
      const popularity = languagesByOcurrence[language];
      return agg.concat({
        language,
        popularity,
        percentage: parseInt((popularity / repos.length) * 100)
      });
    },
    []
  );
  languages.sort((a, b) => b.popularity - a.popularity);
  return languages;
};

export const fetchRepositoriesAndLanguages = githubNick =>
  loadRepositories(githubNick).then(repoData => {
    const repos = repoData
      .map(repositoryToDto)
      .filter(repo => repo.fork === false);
    const languages = getLanguagesInfo(repos, maxLanguages);
    repos.sort((a, b) => b.popularity - a.popularity);
    return [languages.slice(0, maxLanguages), repos.slice(0, maxRepos)];
  });

export const fetchContributions = githubNick =>
  loadContributions(githubNick).then(contributionsData => {
    const contributionCountByRepoUrl = _.countBy(
      contributionsData,
      "repository_url"
    );
    const contributions = Object.keys(contributionCountByRepoUrl).reduce(
      (agg, repo) =>
        agg.concat({ repo, count: contributionCountByRepoUrl[repo] }),
      []
    );
    contributions.sort((a, b) => b.count - a.count);
    return contributions.map(contributionsToDto);
  });

export const fetchUser = githubNick =>
  loadUser(githubNick).then(user => userToDto(user, githubNick));

export const fetchOrgs = githubNick => {
  const thisYear = new Date().getFullYear();
  return loadOrgs(githubNick).then(res =>
    res
      .filter(org => org.login)
      .map(o => ({
        name: o.name || o.login,
        now: thisYear
      }))
  );
};
