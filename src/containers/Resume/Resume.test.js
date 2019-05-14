import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import Resume from "./";
import * as service from "../../service/service";

const repositories = [
  {
    description: "pushState + ajax = pjax",
    fork: false,
    forks: 2083,
    homepage: "https://pjax.herokuapp.com",
    language: "JavaScript",
    name: "jquery-pjax",
    popularity: 18456,
    since: 2011,
    until: 2018,
    watchers: 16373
  },
  {
    description: "~/.js",
    fork: false,
    forks: 374,
    homepage: "http://bit.ly/dotjs",
    language: "Ruby",
    name: "dotjs",
    popularity: 3574,
    since: 2011,
    until: 2018,
    watchers: 3200
  }
];

const languages = [
  { language: "Ruby", popularity: 38, percentage: 63 },
  { language: "Emacs Lisp", popularity: 7, percentage: 11 },
  { language: "JavaScript", popularity: 7, percentage: 11 }
];

const contributions = [
  {
    count: 5,
    repoName: "ajaxorg/ace",
    repoUrl: "https://github.com/ajaxorg/ace"
  },
  {
    count: 3,
    repoName: "atom/atom",
    repoUrl: "https://github.com/atom/atom"
  }
];

const organizations = [{ name: "mustache", now: 2019 }];

const user = {
  name: "Name",
  earlyAdopter: true,
  sinceYear: 2001,
  publicRepos: 2,
  followers: 1,
  website: "http://blog.com"
};

const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

describe("Resume", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(service, "fetchUser");
    sandbox.stub(service, "fetchRepositoriesAndLanguages");
    sandbox.stub(service, "fetchContributions");
    sandbox.stub(service, "fetchOrgs");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("When all methods return corretly resume should display Organization, Contributions, Repositories and languages", async () => {
    service.fetchUser.resolves(user);
    service.fetchRepositoriesAndLanguages.resolves([languages, repositories]);
    service.fetchContributions.resolves(contributions);
    service.fetchOrgs.resolves(organizations);

    const wrapper = await mount(
      <Resume match={{ params: { githubNick: "defunkt" } }} />
    );
    await waitForAsync();
    wrapper.update();

    expect(wrapper.find("Profile").length).toBe(1);
    expect(wrapper.find("Organizations").length).toBe(1);
    expect(wrapper.find("Languages").length).toBe(1);
    expect(wrapper.find("Contributions").length).toBe(1);
  });

  it("When user method does not run correctly", async () => {
    service.fetchUser.rejects({ response: { status: 404 } });

    const wrapper = await shallow(
      <Resume match={{ params: { githubNick: "defunkt" } }} />
    );
    await waitForAsync();
    wrapper.update();

    expect(wrapper.find("Error").length).toBe(1);
  });

  it("When cannot fetch one of minor data requests", async () => {
    service.fetchUser.resolves(user);
    service.fetchRepositoriesAndLanguages.resolves([languages, repositories]);
    service.fetchContributions.rejects({
      response: { data: { message: "error" } }
    });
    service.fetchOrgs.rejects({ response: { data: { message: "error" } } });

    const wrapper = await mount(
      <Resume match={{ params: { githubNick: "defunkt" } }} />
    );
    await waitForAsync();
    wrapper.update();

    expect(wrapper.find(".minorError").length).toBe(2);
  });
});
