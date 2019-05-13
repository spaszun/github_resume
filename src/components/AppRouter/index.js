import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Flex, Box } from "@rebass/grid";
import Error from "../Error";
import { RESUME_PATH, ROOT_PATH } from "../../config/routes";
import Resume from "../../containers/Resume";
import Home from "../../containers/Home";

const NotFound = props => (
  <Error
    {...props}
    title="Not found"
    message="Apologies, but the page you requested could not be found."
  />
);

const AppRouter = () => (
  <Flex
    height={1}
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Box pt={2}>
      <Flex alignItems="center" justifyContent="center">
        <Link to="/">Home</Link>
      </Flex>
    </Box>
    <Box py={5}>
      <Switch>
        <Route exact path={ROOT_PATH} component={Home} />
        <Route path={RESUME_PATH} component={Resume} />
        <Route component={NotFound} />
      </Switch>
    </Box>
  </Flex>
);

export default AppRouter;
