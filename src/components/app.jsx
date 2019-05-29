import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {bool, string} from 'prop-types';
import {hot} from 'react-hot-loader/root';

import GithubInput from './githubInput.jsx';
import Organization from './organization.jsx';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#2BA846'
    }
  }
});

class App extends React.Component {

  static propTypes = {
    loading: bool,
    error: string
  };

  render() {
    const {loading, error} = this.props;
    return (
      <MuiThemeProvider theme={theme}> 
        <Grid className="container" container direction="column">
        <Grid item xs>
          <GithubInput/>
        </Grid>
        <Grid item xs>
          <Box mt={2} display="flex" justifyContent="center">
            {loading ? 'Cargando...' : (
              error ? error : <Organization />
              )}
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
   );
  }
}

const mapStateToProps = state => ({
  loading: state.ui.loading,
  error: state.ui.error
});

export default hot(connect(mapStateToProps)(App));
