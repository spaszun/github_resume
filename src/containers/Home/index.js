import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { InputField, Button } from "./../../components";
import { Flex } from "@rebass/grid";

const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const SearchBox = styled(Flex)`
  padding: 100px 0;
  background-color: #fff;
  width: 400px;
  border-radius: 4px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

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
      <SearchBox
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
      </SearchBox>
    );
  }
}

export default withRouter(Home);
