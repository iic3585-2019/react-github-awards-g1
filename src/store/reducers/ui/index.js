import {
  FETCH_ORGANIZATION_START,
  FETCH_ORGANIZATION_ERROR,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_AWARDS_START,
  FETCH_AWARDS_ERROR,
  FETCH_AWARDS_SUCCESS
} from '../../actions/github';
import {INCREMENT_REPO_PROCESS_COUNT} from '../../actions/ui';

const initialState = {
  loading: false,
  error: null,
  repoProcessCount: 0,
  loadingAwards: false,
  awardsError: null
};

export default (state=initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case FETCH_ORGANIZATION_START: {
      return {...state, loading: true, repoProcessCount: 0};
    }
    case FETCH_ORGANIZATION_SUCCESS: {
      return {...state, loading: false, error: null};
    }
    case FETCH_ORGANIZATION_ERROR: {
      const {error} = payload;
      return {...state, loading: false, error: error};
    }
    case FETCH_AWARDS_START: {
      return {...state, loadingAwards: true};
    }
    case FETCH_AWARDS_ERROR: {
      const {error} = payload;
      return {...state, awardsError: error};
    }
    case FETCH_AWARDS_SUCCESS: {
      return {...state, loadingAwards: false, error: null};
    }
    case INCREMENT_REPO_PROCESS_COUNT: {
      let {repoProcessCount} = state;
      repoProcessCount++;
      return {...state, repoProcessCount};
    }
    default:
      return state;
  }
};
