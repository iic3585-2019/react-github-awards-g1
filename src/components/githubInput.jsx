import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {connect} from 'react-redux';
import {func} from 'prop-types';

import {fetchOrganization} from '../store/actions/github';

class GithubInput extends React.Component {

  static propTypes = {
    fetchOrganization: func
  };

  state = {
    organizationName: ''
  };

  render() {
    const {organizationName} = this.state;
    const {fetchOrganization} = this.props;

    return (<Grid container justify="center" alignItems="center">
      <Grid item xs={6} sm={9}>
        <TextField
          fullWidth
          id="github-organization"
          label="Github organization"
          margin="normal"
          value={organizationName}
          onChange={(event) => {
            this.setState({organizationName: event.target.value});
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faGithub} />
              </InputAdornment>
            ),
          }}/>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={() => fetchOrganization(organizationName)}
            color="primary">
            <Grid container spacing={2} justify="center">
              <Grid item xs>
                Buscar
              </Grid>
              <Grid item xs>
                <FontAwesomeIcon icon={faSearch}/>
              </Grid>
            </Grid>
          </Button>
        </Box>
      </Grid>
    </Grid>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchOrganization: (organizationName) => dispatch(fetchOrganization(organizationName))
});

export default connect(null, mapDispatchToProps)(GithubInput);
