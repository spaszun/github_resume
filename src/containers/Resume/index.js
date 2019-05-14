import React from "react";
import { Flex, Box } from "@rebass/grid";
import { Link } from "react-router-dom";
import { FieldError } from "../../components/Fields";
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
import Error from "../../components/Error";

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
      errorContributions: null,
      isFatalError: false,
      fatalErrorCode: false
    };
  }

  handleErrors(error) {
    const isFatalError = true;
    const githubNick = this.getGithubNick();
    let fatalError;
    if (error.response && error.response.status === 403) {
      fatalError = {
        title: "Api Limit reached",
        message: "Please try again later"
      };
    } else if (error.response && error.response.status === 404) {
      fatalError = {
        title: "User not Found",
        message: `User "${githubNick}" not found on github.`
      };
    } else {
      fatalError = {
        title: "Unknown error happened",
        message: "Please try again later"
      };
    }
    this.setState({ isFatalError, fatalError });
  }

  componentDidMount() {
    this.setState({ isLoadingUser: true });
    const githubNick = this.getGithubNick();
    fetchUser(githubNick)
      .then(result => {
        this.setState({
          user: result,
          isLoadingUser: false
        });
      })
      .then(() => this.loadRest(githubNick))
      .catch(errorUser => {
        this.handleErrors(errorUser);
        this.setState({
          errorUser,
          isLoadingUser: false
        });
      });
  }

  getGithubNick() {
    const { githubNick } = this.props.match.params;
    return githubNick;
  }

  loadRest(githubNick) {
    Promise.all([
      this.loadOrgs(githubNick),
      this.loadRepositoriesAndLanguages(githubNick),
      this.loadContributions(githubNick)
    ]);
  }

  loadOrgs(githubNick) {
    this.setState({ isLoadingOrgs: true });
    return fetchOrgs(githubNick)
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
  }

  loadRepositoriesAndLanguages(githubNick) {
    this.setState({ isLoadingRepos: true });
    return fetchRepositoriesAndLanguages(githubNick)
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

    return fetchContributions(githubNick)
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
    const { githubNick } = this.props.match.params;
    const {
      user,
      isLoadingUser,
      languages,
      repos,
      contributions,
      organizations,
      isLoadingContributions,
      isLoadingRepos,
      isLoadingOrgs,
      isFatalError,
      fatalError
    } = this.state;

    const minorErrors = () => {
      const { errorContributions, errorOrgs, errorRepos } = this.state;
      const minorErrorsArray = [
        { key: "contributions", error: errorContributions },
        { key: "organizations", error: errorOrgs },
        { key: "repositories and lanuages", error: errorRepos }
      ].filter(e => e.error);
      const mapErrors = (error, idx) =>
        error && (
          <div key={idx} className="minorError">
            {`Problems with loading ${error.key}`}
          </div>
        );
      return (
        <React.Fragment>
          {minorErrorsArray.some(e => e.error) && (
            <FieldError>{minorErrorsArray.map(mapErrors)}</FieldError>
          )}
        </React.Fragment>
      );
    };

    if (isLoadingUser) {
      return <div>Loading ...</div>;
    }

    if (isFatalError) {
      return <Error title={fatalError.title} message={fatalError.message} />;
    }

    return (
      <React.Fragment>
        <Box pt={2}>
          <Flex alignItems="center" justifyContent="center">
            <Link to="/">Create another resume</Link>
          </Flex>
        </Box>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {minorErrors()}

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
          <Footer user={user} githubNick={githubNick} />
        </Flex>
      </React.Fragment>
    );
  }
}

export default Resume;
