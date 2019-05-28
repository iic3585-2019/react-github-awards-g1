import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {number, bool} from 'prop-types';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faBolt} from '@fortawesome/free-solid-svg-icons';

import TopCommitter from './awards/topCommitter.jsx';
import FastestRepos from './awards/fastestRepos.jsx';

class Awards extends React.Component {

  state = {
    value: 0
  };

  static propTypes = {
    repoProcessCount: number,
    loading: bool,
    repoCount: number
  };

  render() {
    const {loading, repoProcessCount, repoCount} = this.props;
    const {value} = this.state;
    if (loading) {
      return (
        <Box display="flex" justifyContent="center">
          Procesando {repoProcessCount}/{repoCount} repos
        </Box>
      );
    }
    return (
      <Router>
        <Grid container direction="column">
          <Grid item>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(_, newValue) => this.setState({value: newValue})}>
                <BottomNavigationAction
                  to="/"
                  component={Link}
                  label="Top committers"
                  icon={<FontAwesomeIcon icon={faGithub}/>}/>
                <BottomNavigationAction
                  to="/fastest"
                  component={Link}
                  label="Fastest repos"
                  icon={<FontAwesomeIcon icon={faBolt}/>}/>
            </BottomNavigation>
          </Grid>
          <Grid item>
            <Route path="/" exact component={TopCommitter}/>
            <Route path="/fastest" exact component={FastestRepos}/>
          </Grid>
        </Grid>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.ui.loadingAwards,
  repoProcessCount: state.ui.repoProcessCount,
  repoCount: state.github.organization.public_repos,
});

export default connect(mapStateToProps)(Awards);
