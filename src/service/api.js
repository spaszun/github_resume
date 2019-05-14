import axios from "axios";

const loadAllFromPagedResource = (url, extractor) => {
  const loadChunkRecursivly = (pageNumber = 1, aggregator = []) =>
    axios
      .get(
        `${url}${
          url.indexOf("?") > -1 ? "&" : "?"
        }per_page=100&page=${pageNumber}`
      )
      .then(result => {
        const res = extractor ? extractor(result.data) : result.data;
        if (result.data.length === 100) {
          return loadChunkRecursivly(pageNumber + 1, aggregator.concat(res));
        } else {
          return aggregator.concat(res);
        }
      });
  return loadChunkRecursivly();
};

const API = "https://api.github.com";

export const loadRepositories = githubNick =>
  loadAllFromPagedResource(`${API}/users/${githubNick}/repos`);

export const loadContributions = githubNick =>
  loadAllFromPagedResource(
    `${API}/search/issues?q=type:pr+is:merged+author:${githubNick}`,
    data => data.items
  );

export const loadUser = githubNick =>
  axios.get(`${API}/users/${githubNick}`).then(res => res.data);

export const loadOrgs = githubNick =>
  axios.get(`${API}/users/${githubNick}/orgs`).then(res => res.data);
