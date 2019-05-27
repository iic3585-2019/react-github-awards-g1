import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {object} from 'prop-types';

class TopCommitter extends React.Component {

  static propTypes = {
    topCommitter: object
  };

  render() {
    const {topCommitter: {commits, author: {login, avatar_url}}} = this.props;
    return (
      <Grid container>
        <Grid item container xs={2} justify="center" alignItems="center">
          <Box p={0.5} display="flex" justifyContent="center" alignItems="center">
            <img className="avatar-img" src={avatar_url}/>
          </Box>
        </Grid>
        <Grid item container xs={10} justify="center" alignItems="center">
          <Grid item xs>
            <span className="title">Top committer</span>
            <div>
              @{login} {commits} commits
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  topCommitter: state.github.awards.topCommitter
});

export default connect(mapStateToProps)(TopCommitter);
