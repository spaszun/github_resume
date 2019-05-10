export const repositoryMapper = repo => ({
    language: repo.language,
    popularity: repo.watchers + repo.forks,
    name: repo.name,
    since: new Date(repo.created_at).getFullYear(),
    until: new Date(repo.pushed_at).getFullYear(),
    description: repo.description,
    homepage: repo.homepage,
    watchers: repo.watchers,
    forks: repo.forks,
    fork: repo.fork,
});

export const contributionsMapper = con => ({
    repositoryUrl: con.repository_url,
});