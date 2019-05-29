import moment from 'moment';

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
  let repoTimes = {};
  let commitTimes = {};
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
        const firstCommit = commits[commits.length - 1];
        const lastCommit = commits[0];

        const firstDate = moment(firstCommit.commit.author.date);
        const lastDate = moment(lastCommit.commit.author.date);

        repoTimes[repo.name] = {
          duration: lastDate.diff(firstDate, 'seconds'),
          name: repo.name,
          firstDate: firstCommit.commit.author.date,
          lastDate: lastCommit.commit.author.date
        };

        totalCommits = [...totalCommits, ...commits];
        dispatch(incrementRepoProcessCount());
      })
    );

    totalCommits.forEach(commit => {
      let date = moment(commit.commit.author.date).hour();
      if (commitTimes[date]) {
        commitTimes[date] += 1;
      } else {
        commitTimes[date] = 1;
      }
    });

    // Get commits per author
    const commitAuthors = totalCommits.reduce((acc, commit) => {
      const {author} = commit;
      if (author) {
        acc[author.login] = acc[author.login] || {info: author};
        acc[author.login].commits = acc[author.login].commits + 1 || 1;
      }
      return acc;
    }, {});

    dispatch(fetchAwardsSuccess({
      totalCommits,
      commitAuthors,
      repoTimes,
      commitTimes
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
