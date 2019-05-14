import React from "react";
import { withRouter } from "react-router-dom";
import { InputField, Button } from "./../../components";
import { Flex, Box } from "@rebass/grid";
import Resume from "../Resume";

const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      meta: {
        touched: false,
        error: ""
      }
    };
  }

  createResume() {
    const { history } = this.props;
    history.push(`/resume/${this.state.inputValue}`);
  }

  onChange(value) {
    this.setState({ inputValue: value, meta: this.meta(value) });
  }

  meta(value) {
    return {
      touched: true,
      error: this.validate(value)
    };
  }

  validate(inputValue) {
    if (!inputValue) {
      return "Should not be empty";
    } else if (!GITHUB_USERNAME_REGEX.test(inputValue)) {
      return "not a valid github username";
    }

    return "";
  }

  render() {
    return (
      <Flex
        height={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <InputField
          onChange={e => this.onChange(e.target.value)}
          placeholder="github nickname"
          value={this.state.inputValue}
          meta={this.state.meta}
        />
        <Button
          type="button"
          onClick={() => this.createResume()}
          disabled={!this.state.meta.touched || !!this.state.meta.error}
          primary
        >
          Create resume
        </Button>
      </Flex>
    );
  }
}

export default withRouter(Home);
