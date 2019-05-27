import {incrementRepoProcessCount} from './ui';
import {githubFetch} from '../../github';

export const FETCH_ORGANIZATION_START = 'fetch-organization/start';
export const FETCH_ORGANIZATION_ERROR = 'fetch-organization/error';
export const FETCH_ORGANIZATION_SUCCESS = 'fetch-organization/success';

export const FETCH_AWARDS_START = 'fetch-awards/start';
export const FETCH_AWARDS_ERROR = 'fetch-awards/error';
export const FETCH_AWARDS_SUCCESS = 'fetch-awards/success';

const API_URL_BASE = 'https://api.github.com';

const fetchOrganizationStart = () => ({
  type: FETCH_ORGANIZATION_START,
  payload: {}
});

const fetchOrganizationError = (error) => ({
  type: FETCH_ORGANIZATION_ERROR,
  payload: {error}
});

const fetchOrganizationSuccess = (organization) => ({
  type: FETCH_ORGANIZATION_SUCCESS,
  payload: {organization}
});

const fetchAwardsSuccess = (awards) => ({
  type: FETCH_AWARDS_SUCCESS,
  payload: {awards}
});

const fetchAwardsError = (error) => ({
  type: FETCH_AWARDS_ERROR,
  payload: {error}
});

const fetchAwardsStart = () => ({
  type: FETCH_AWARDS_START,
  payload: {}
});

export const fetchOrganization = (organizationName) => (dispatch) => {
  dispatch(fetchOrganizationStart());
  githubFetch(API_URL_BASE + '/orgs/' + organizationName).then((response) => {
    if (response.status !== 200) {
      dispatch(fetchOrganizationError('ERROR EN LA SOLICITUD'));
    } else {
      response.json().then((data => {
        dispatch(fetchAwardsStart());
        dispatch(fetchOrganizationSuccess(data));
        dispatch(fetchAwards(data));
      }));
    }
  });
};

export const fetchAwards = (data) => async (dispatch) => {
  let totalIssues = [];
  let totalCommits = [];
  const response = await githubFetch(data.repos_url);
  if (response.status !== 200) {
    dispatch(fetchAwardsError('ERROR AL OBTENER REPOS'));
  } else {
    const repos = await response.json();
    await Promise.all(
      repos.map(async repo => {
        // Get issues
        if (repo.has_issues) {
          const issues = await fetchIssues(repo, dispatch);
          totalIssues = [...totalIssues, ...issues];
        }

        // Get commits
        const commits = await fetchCommits(repo, dispatch);
        totalCommits = [...totalCommits, ...commits];
        dispatch(incrementRepoProcessCount());
      })
    );

    // Get commits per author
    const commitAuthors = Object.entries(totalCommits.reduce((acc, commit) => {
      const {author} = commit;
      if (author) {
        acc[author.login] = acc[author.login] || {info: author};
        acc[author.login].commits = acc[author.login].commits + 1 || 1;
      }
      return acc;
    }, {}));

    const commitAwards = commitAuthors.reduce((acc, curr) => {
      const [_, data] = curr;
      const {commits, info} = data;
      if (commits > acc.topCommitter.commits) {
        acc.topCommitter = {commits, author: info};
      }
      return acc;
    }, {
      topCommitter: {
        commits: 0
      }
    });
    dispatch(fetchAwardsSuccess({
      ...commitAwards
    }));
  }
};

const fetchIssues = async (repo, dispatch) => {
  const response = await githubFetch(`${API_URL_BASE}/repos/${repo.owner.login}/${repo.name}/issues?state=all`);
  if (response.status !== 200) {
    dispatch(fetchAwardsError('ERROR AL OBTENER ISSUES'));
    return [];
  } else {
    return await response.json();
  }
};

const fetchCommits = async (repo, dispatch) => {
  const response = await githubFetch(`${API_URL_BASE}/repos/${repo.owner.login}/${repo.name}/commits`);
  if (response.status !== 200) {
    dispatch(fetchAwardsError('ERROR AL OBTENER COMMITS'));
    return [];
  } else {
    return await response.json();
  }
};
