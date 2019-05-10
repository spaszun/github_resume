import React from 'react';
import { Flex, Box } from "@rebass/grid";
import { fetchRepositoriesAndLanguages, fetchContributions, fetchUser, fetchOrgs } from "../../service/service"

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
        fetchUser(githubNick).then(result => { 
              this.setState({
                user: result,
                isLoading: false
          })})
          .catch(error => this.setState({
            error,
            isLoading: false
          }));

        fetchOrgs(githubNick).then(organizations => this.setState({
            organizations,
            isLoading: false
          }))
          .catch(error => this.setState({
            error,
            isLoading: false
          }));

          this.loadRepositoriesAndLanguages(githubNick);
          this.loadContributions(githubNick);
      }

    loadRepositoriesAndLanguages(githubNick) {
        this.setState({ isLoadingRepos: true });
        fetchRepositoriesAndLanguages(githubNick).then(([languages, repos]) => {
            this.setState({ 
                languages,
                repos,
                isLoadingRepos: false 
            });
        }).catch(error => this.setState({
            error,
            isLoadingRepos: false
        }));
    }

    loadContributions(githubNick) {
        this.setState({ isLoadingContributions: true });

        fetchContributions(githubNick).then(contributions => {
            this.setState({ 
                contributions,
                isLoadingContributions: false 
            });
        }).catch(error => this.setState({
            error,
            isLoadingContributions: false
        }));
    }

    userReposDesc(user, githubNick) {
        if (user.publicRepos > 0) {
            return <a href={`https://github.com/${githubNick}?tab=repositories`}>{`${user.publicRepos} public repositor${user.publicRepos > 1 ? 'ies' : 'y'}`}</a>
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
        const { user, isLoading, languages, repos, contributions, organizations } = this.state;
        if (isLoading) {
            return <div>Loading ...</div>;
        }

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center">
                <Box width={1/2} px={2}>
                    <h1>{ user.name }</h1>
                    <h2>
                    { `On GitHub ${user.earlyAdopter ? ' as an early adopter ': ' '} since ${user.sinceYear} ` }
                    { user.name } is a developer 
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
                            <a href={user.website} id="mywebsite" title={`${githubNick}'s website`}>{user.website}</a>
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
                        { user.name + ' - '}
                        { user.email && [<a href={`mailto:${user.email}`}>{ user.email }</a>,  ' - '] } 
                        { user.website && [<a href={user.website} title={`${user.name}'s website`}>{user.website}</a>, ' - '] } 
                        <a href={`https://github.com/${githubNick}`} title="GitHub profile" class="url">{`https://github.com/${githubNick}`}</a>
                    </p>
                </footer>
            </Flex>
        );
    }
}

export default Resume;