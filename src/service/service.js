import _ from "lodash";
import { loadRepositories, loadContributions, loadUser, loadOrgs } from "./api"

const getLanguagesInfo = (repositories) => {
    const repos = repositories.filter(r => r.language);
    const languagesByOcurrence = _.countBy(repos, 'language');
    const languages = Object.keys(languagesByOcurrence).reduce(
        (agg, language) => {
            const popularity = languagesByOcurrence[language]
            return agg.concat({
                language, 
                popularity,
                percentage: parseInt((popularity / repos.length ) * 100)
            })
    }, []);
    languages.sort((a, b) => b.popularity - a.popularity);
    return languages;
}

export const fetchRepositoriesAndLanguages = (githubNick) => 
    loadRepositories(githubNick).then((repoData) => {
        const repos = repoData.filter(repo => repo.fork === false);
        const maxLanguages = 9;
        const maxRepos = 5;
        const languages = getLanguagesInfo(repos, maxLanguages);
        repos.sort((a, b) => b.popularity - a.popularity );
        return [ languages.slice(0, maxLanguages), repos.slice(0, maxRepos) ];
    });

export const fetchContributions = (githubNick) => 
    loadContributions(githubNick).then(contributionsData => {
        const contributionCountByRepoUrl = _.countBy(contributionsData, 'repositoryUrl');
        const contributions = Object.keys(contributionCountByRepoUrl)
            .reduce((agg, repo) => agg.concat({ repo, count: contributionCountByRepoUrl[repo] }), [])
        contributions.sort((a, b) => b.count - a.count );
        return contributions.map(con => {
            const repoUrl = con.repo.replace(/https:\/\/api\.github\.com\/repos/, 'https://github.com');
            const repoName = con.repo.replace(/https:\/\/api\.github\.com\/repos\//, '');
            return { repoUrl, repoName, count: con.count, };
        });
    });

export const fetchUser = (githubNick) => loadUser(githubNick).then(user => { 
        const sinceDate = new Date(user.created_at);
        const sinceYear = sinceDate.getFullYear();
        const sinceMonth = sinceDate.getMonth();
        const earlyAdopter = (sinceYear === 2008 && sinceMonth <= 5) || sinceYear <= '2007';
        return {
            name: user.name || githubNick,
            earlyAdopter,
            sinceYear,
            loaction: user.location,
            publicRepos: user.public_repos,
            followers: user.followers,
            website: user.blog && `${user.blog.indexOf('http') > -1 ? '' : 'http://'}${user.blog}`
        }  
    });

export const fetchOrgs = (githubNick) => { 
    const thisYear = new Date().getFullYear();
    return loadOrgs(githubNick).then(res => res.filter(org => org.login).map(o => ({
        name: o.name || o.login,
        now: thisYear
    })))
};   