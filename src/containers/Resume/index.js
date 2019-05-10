import React from 'react';
import { Flex, Box } from "@rebass/grid";
import axios from "axios";
import _ from "lodash";

const API = 'https://api.github.com'

class Resume extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          user: {},
          repos: [],
          languages: [],
          contributions: [],
          organizations: [],
          isLoading: false,
          isLoadingRepos: false,
          isLoadingContributions: false,
          error: null,
        };
      }
    
      componentDidMount() {
        this.setState({ isLoading: true });
        const { githubNick } = this.props;
        axios.get(`${API}/users/${githubNick}`)
          .then(result => { 
              this.setState({
                user: result.data,
                isLoading: false
          })})
          .catch(error => this.setState({
            error,
            isLoading: false
          }));

          const thisYear = new Date().getFullYear();
          axios.get(`${API}/users/${githubNick}/orgs`)
          .then(result => this.setState({
            organizations: result.data.filter(org => org.login).map(o => ({
                name: o.name || o.login,
                now: thisYear
            })),
            isLoading: false
          }))
          .catch(error => this.setState({
            error,
            isLoading: false
          }));

          this.loadRepositories(githubNick);
          this.loadContributions(githubNick);
      }

    getLanguagesInfo(repositories) {
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
        console.log('languages', languagesByOcurrence);
        languages.sort((a, b) => b.popularity - a.popularity);
        return languages;
    }

    loadRepositories(githubNick) {
        this.setState({ isLoadingRepos: true });
        const processor = result => result.map(repo => ({
            language: repo.language,
            popularity: repo.watchers + repo.forks,
            name: repo.name,
            since: new Date(repo.created_at).getFullYear(),
            until: new Date(repo.pushed_at).getFullYear(),
            description: repo.description,
            homepage: repo.homepage,
            watchers: repo.watchers,
            forks: repo.forks,
            fork: repo.fork,
        }));

        this.loadAllFromPagedResource(`${API}/users/${githubNick}/repos`, processor).then((repoData) => {
            console.log('loadAllFromPagedResource ', repoData);
            const repos = repoData.filter(repo => repo.fork === false);
            const maxLanguages = 9;
            const maxRepos = 5;
            const languages = this.getLanguagesInfo(repos, maxLanguages);
            repos.sort((a, b) => b.popularity - a.popularity );
            console.log('languages', languages);
            console.log(repos);
            this.setState({ 
                languages: languages.slice(0, maxLanguages),
                repos: repos.slice(0, maxRepos),
                isLoadingRepos: false 
            });
        }).catch(error => {console.error(error); this.setState({
            error,
            isLoadingRepos: false
        })});
    }

    loadContributions(githubNick) {
        this.setState({ isLoadingContributions: true });

        const processor = result => result.items.map(repo => ({
            repositoryUrl: repo.repository_url,
        }));

        this.loadAllFromPagedResource(`${API}/search/issues?q=type:pr+is:merged+author:${githubNick}`, processor).then(contributionsData => {
            console.log(contributionsData);
            const contributionCountByRepoUrl = _.countBy(contributionsData, 'repositoryUrl');
            const contributions = Object.keys(contributionCountByRepoUrl)
                .reduce((agg, repo) => agg.concat({ repo, count: contributionCountByRepoUrl[repo] }), [])
            console.log('contributions', contributions);
            contributions.sort((a, b) => b.count - a.count );
            console.log('contributionsSorted', contributions);
            const contributionsMapped = contributions.map(con => {
                const repoUrl = con.repo.replace(/https:\/\/api\.github\.com\/repos/, 'https://github.com');
                const repoName = con.repo.replace(/https:\/\/api\.github\.com\/repos\//, '');
                return { repoUrl, repoName, count: con.count, };
            });
            console.log('contributionsMApped', contributionsMapped);
            this.setState({ 
                contributions: contributionsMapped,
                isLoadingContributions: false 
            });
        }).catch(error => { console.error('contribytion error', error); this.setState({
            error,
            isLoadingContributions: false
        })});
    }

    loadAllFromPagedResource(url, processor) {
        console.log('loading from ' + url);
        const loadChunkRecursivly = (pageNumber=1, aggregator=[]) => 
            axios.get(`${url}${url.indexOf('?') > -1 ? '&' : '?'}per_page=100&page=${pageNumber}`)
            .then(result => { 
                const res = processor ? processor(result.data) : result.data;
                if (result.data.length === 100) {
                    return loadChunkRecursivly(pageNumber + 1, aggregator.concat(res));
                } else {
                    return aggregator.concat(res);
                }
            });
        return loadChunkRecursivly();
    }

    userSinceDescription(user) {
        var sinceDate = new Date(user.created_at);
        const sinceYear = sinceDate.getFullYear();
        const sinceMonth = sinceDate.getMonth();
        const earlyAdopter = (sinceYear === 2008 && sinceMonth <= 5) || since <= '2007';
        return `On GitHub
            ${earlyAdopter ? ' as an early adopter ': ' '}
            since ${sinceYear} `;
    }

    userReposDesc(user, githubNick) {
        if (user.public_repos > 0) {
            return <a href={`https://github.com/${githubNick}?tab=repositories`}>{`${user.public_repos} public repositor${user.public_repos > 1 ? 'ies' : 'y'}`}</a>
        } 
        return ' without any public repository for now ';
    }

    userFollowersDesc(user, githubNick) {
        if (user.followers > 0) {
            return [' and ', <a href={`https://github.com/${githubNick}/followers`}>{`${user.followers} follower${user.followers > 1 ? 's' : ''}`}</a>]
        } 
        return '';
    }

    render() {
        const { githubNick } = this.props;
        const { user, isLoading, languages, isLoadingRepos, repos, contributions, organizations } = this.state;
        if (isLoading) {
            return <div>Loading ...</div>;
        }

        const name = user.name || githubNick;
        const website = user.blog && `${user.blog.indexOf('http') > -1 ? '' : 'http://'}${user.blog}`

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center">
                <Box width={1/2} px={2}>
                    <h1>{ name }</h1>
                    <h2>
                    { this.userSinceDescription(user) }
                    { name } is a developer 
                    { user.location ? [' based in', <span>{user.location}</span> ] : ' ' }
                     with 
                    { ' ' }
                    { this.userReposDesc(user, githubNick) }
                    { ' ' }
                    { this.userFollowersDesc(user, githubNick) }
                    </h2>
                    { user.blog && <div>
                        <div>
                            <h2>Website</h2>
                        </div>
                        <div id="content-website">
                            <a href={website} id="mywebsite" title={`${githubNick}'s website`}>{website}</a>
                        </div>
                    </div>}

                    <div>
                        <div>
                            <h2>Languages</h2>
                        </div>
                        <div>
                            <ul>
                            { languages.map((l) => <li key={l.language}>{l.language} {l.percentage} %</li>) }
                           </ul>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h2>Repositories</h2>
                        </div>
                        <div>
                            { repos.map((r, i) => 
                                <div key={i}>
                                <h2>
                                    <a href={`https://github.com/${githubNick}/${r.name}`}>{r.name}</a>
                                </h2>
                                <h3> {r.language ? r.language + ' - ': '' } Creator &amp; Owner</h3>
                                <h4>{ r.since } {r.since !== r.until ? ` - ${r.until}` : '' }</h4>
                                <p>{r.description} { r.homepage && <a href={r.homepage}> { r.homepage }</a>}</p>
                                <p>
                                    This repository has {r.watchers} watcher(s)  and {r.forks} fork(s).
                                    If you would like more information about this repository and my
                                    contributed code, please visit {' '}
                                    {<a href={`https://github.com/${githubNick}/${r.name}`}>the repo</a>} on
                                    GitHub.
                                </p>
                                </div>) }
                        </div>
                    </div>

                    <div>
                        <div>
                            <h2>Contributions</h2>
                        </div>
                        <div>
                        { contributions.map(c => 
                            <div className="contributions" key={c.repoName}>
                                <h2>
                                    <a href={c.repoUrl}>{c.repoName}</a>
                                </h2>
                                <p>{githubNick} has contributed for <a href={c.repoUrl}>{c.repoName}</a> with <a href={`${c.repoUrl}/commits?author=${githubNick}`}>{c.count} commit(s)</a></p>
                            </div>)
                        }
                        </div>
                    </div>

                    <div>
                        <div>
                            <h2>Organizations</h2>
                        </div>
                        <div>
                            {organizations.map(o => <div>
                            <h2>{o.name}</h2>
                            <h3>Member</h3>
                            <h4>{o.now}</h4>
                            <p>If you would like more information about this organization, please visit <a href={`https://github.com/${o.name}`}>the organization page</a> on GitHub.</p>
                            </div>)}
                        </div>
                    </div>
                </Box>
                <footer>
                    <p>
                        {name + ' - '}
                        { user.email && [<a href={`mailto:${user.email}`}>{ user.email }</a>,  ' - '] } 
                        { website && [<a href={website} title={`${name}'s website`}>{website}</a>, ' - '] } 
                        <a href={`https://github.com/${githubNick}`} title="GitHub profile" class="url">{`https://github.com/${githubNick}`}</a>
                    </p>
                </footer>
            </Flex>
        );
    }
}

export default Resume;