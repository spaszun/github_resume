import React from "react";
import { Route, Switch } from "react-router-dom";
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
  <Switch>
    <Route exact path={ROOT_PATH} component={Home} />
    <Route path={RESUME_PATH} component={Resume} />
    <Route component={NotFound} />
  </Switch>
);

export default AppRouter;
