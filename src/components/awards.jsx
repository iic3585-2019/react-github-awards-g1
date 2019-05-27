import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {number, bool} from 'prop-types';

import TopCommitter from './awards/topCommitter.jsx';

class Awards extends React.Component {

  static propTypes = {
    repoProcessCount: number,
    loading: bool,
    repoCount: number
  };

  render() {
    const {loading, repoProcessCount, repoCount} = this.props;
    if (loading) {
      return (
        <Box display="flex" justifyContent="center">
          Procesando {repoProcessCount}/{repoCount} repos
        </Box>
      );
    }
    return (
      <Grid container direction="column">
        <Grid item xs>
          <h3>Awards</h3>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={6} md={4}>
            <TopCommitter/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.ui.loadingAwards,
  repoProcessCount: state.ui.repoProcessCount,
  repoCount: state.github.organization.public_repos,
});

export default connect(mapStateToProps)(Awards);
