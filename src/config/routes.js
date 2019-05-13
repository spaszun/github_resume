export const ROOT_PATH = "/";

export const makePath = (...x) =>
  x[0].startsWith(ROOT_PATH) ? x.join("/") : `${ROOT_PATH}${x.join("/")}`;

export const RESUME_PATH = makePath("resume", ":githubNick");
