import React from "react";
import { Flex, Box } from "@rebass/grid";
import {
  fetchRepositoriesAndLanguages,
  fetchContributions,
  fetchUser,
  fetchOrgs
} from "../../service/service";
import { Organizations } from "../../components/Organizations";
import { Contributions } from "../../components/Contributions";
import { Repositories } from "../../components/Repositories";
import { Languages } from "../../components/Languages";
import { Profile } from "../../components/Profile";
import { Website } from "../../components/Website";
import { Footer } from "../../components/Footer";
import { ResumeRow } from "../../components/ResumeRow";

class Resume extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      repos: [],
      languages: [],
      contributions: [],
      organizations: [],
      isLoadingUser: false,
      isLoadingRepos: false,
      isLoadingOrgs: false,
      isLoadingContributions: false,
      errorUser: null,
      errorRepos: null,
      errorOrgs: null,
      errorContributions: null
    };
  }

  componentDidMount() {
    this.setState({ isLoadingUser: true });
    const { githubNick } = this.props;
    fetchUser(githubNick)
      .then(result => {
        this.setState({
          user: result,
          isLoadingUser: false
        });
      })
      .catch(errorUser =>
        this.setState({
          errorUser,
          isLoadingUser: false
        })
      );

    this.setState({ isLoadingOrgs: true });
    fetchOrgs(githubNick)
      .then(organizations =>
        this.setState({
          organizations,
          isLoadingOrgs: false
        })
      )
      .catch(errorOrgs =>
        this.setState({
          errorOrgs,
          isLoadingOrgs: false
        })
      );

    this.loadRepositoriesAndLanguages(githubNick);
    this.loadContributions(githubNick);
  }

  loadRepositoriesAndLanguages(githubNick) {
    this.setState({ isLoadingRepos: true });
    fetchRepositoriesAndLanguages(githubNick)
      .then(([languages, repos]) => {
        this.setState({
          languages,
          repos,
          isLoadingRepos: false
        });
      })
      .catch(errorRepos =>
        this.setState({
          errorRepos,
          isLoadingRepos: false
        })
      );
  }

  loadContributions(githubNick) {
    this.setState({ isLoadingContributions: true });

    fetchContributions(githubNick)
      .then(contributions => {
        this.setState({
          contributions,
          isLoadingContributions: false
        });
      })
      .catch(errorContributions =>
        this.setState({
          errorContributions,
          isLoadingContributions: false
        })
      );
  }

  render() {
    const { githubNick } = this.props;
    const {
      user,
      isLoadingUser,
      languages,
      repos,
      contributions,
      organizations,
      isLoadingContributions,
      isLoadingRepos,
      isLoadingOrgs
    } = this.state;
    if (isLoadingUser) {
      return <div>Loading ...</div>;
    }

    const errors = () => {
      const {
        errorContributions,
        errorOrgs,
        errorRepos,
        errorUser
      } = this.state;
      const isError =
        errorContributions || errorOrgs || errorRepos || errorUser;
      return (
        isError && (
          <React.Fragment>
            {errorContributions && <div>{errorContributions}</div>}
            {errorOrgs && <div>{errorOrgs}</div>}
            {errorRepos && <div>{errorRepos}</div>}
            {errorUser && <div>{errorUser}</div>}
          </React.Fragment>
        )
      );
    };

    return (
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        {errors()}
        <Box width={1 / 2} px={2}>
          <h1>{user.name}</h1>
          <ResumeRow title="Github Profile">
            <Profile user={user} githubNick={githubNick} />
          </ResumeRow>
          {user.website && (
            <ResumeRow title="Website">
              <Website website={user.website} githubNick={githubNick} />
            </ResumeRow>
          )}
          <ResumeRow title="Languages" isLoading={isLoadingRepos}>
            <Languages languages={languages} />
          </ResumeRow>
          <ResumeRow title="Repositories" isLoading={isLoadingRepos}>
            <Repositories repositories={repos} githubNick={githubNick} />
          </ResumeRow>
          <ResumeRow title="Contributions" isLoading={isLoadingContributions}>
            <Contributions
              contributions={contributions}
              githubNick={githubNick}
            />
          </ResumeRow>
          <ResumeRow title="Organizations" isLoading={isLoadingOrgs}>
            <Organizations organizations={organizations} />
          </ResumeRow>
        </Box>
        <Footer user={user} />
      </Flex>
    );
  }
}

export default Resume;
