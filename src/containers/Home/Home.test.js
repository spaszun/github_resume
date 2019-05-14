import React from "react";
import { shallow, mount } from "enzyme";
import Home from "./";
import { BrowserRouter as Router } from "react-router-dom";

describe("Home", () => {
  it("No error is displayed on start", done => {
    const wrapper = mount(
      <Router>
        <Home />
      </Router>
    );
    const input = wrapper.find("input");

    const error = wrapper.find(".error").hostNodes();
    expect(error.length).toEqual(0);
    done();
  });

  it("Displays an error if input touched and in incorect format", done => {
    const wrapper = mount(
      <Router>
        <Home />
      </Router>
    );
    const input = wrapper.find("input");

    input.simulate("change", { target: { value: "Hello_" } });
    const error = wrapper.find(".error").hostNodes();
    expect(error.hasClass("error")).toBeTruthy();
    expect(error.text()).toBe("not a valid github username");

    const button = wrapper.find("button");
    expect(button.prop("disabled")).toEqual(true);
    done();
  });

  it("resume button is disabled when not touched", done => {
    const wrapper = mount(
      <Router>
        <Home />
      </Router>
    );

    expect(wrapper.find("button").prop("disabled")).toEqual(true);
    done();
  });

  it("resume button is disabled when not valid input is entered", done => {
    const wrapper = mount(
      <Router>
        <Home />
      </Router>
    );
    const input = wrapper.find("input");

    input.simulate("change", { target: { value: "_" } });

    expect(wrapper.find("button").prop("disabled")).toEqual(true);
    done();
  });

  it("resume button is enabled when valid input is entered", done => {
    const wrapper = mount(
      <Router>
        <Home />
      </Router>
    );
    const input = wrapper.find("input");

    input.simulate("change", { target: { value: "a" } });

    expect(wrapper.find("button").prop("disabled")).toEqual(false);
    done();
  });
});
