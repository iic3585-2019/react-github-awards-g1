export const INCREMENT_REPO_PROCESS_COUNT = 'INCREMENT_REPO_PROCESS_COUNT';
export const RESET_REPO_PROCESS_COUNT = 'RESET_REPO_PROCESS_COUNT';

export const incrementRepoProcessCount = () => ({
  type: INCREMENT_REPO_PROCESS_COUNT,
  payload: {}
});

export const resetRepoProcessCount = () => ({
  type: RESET_REPO_PROCESS_COUNT,
  payload: {}
});
