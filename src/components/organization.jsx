import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {object} from 'prop-types';

import Awards from './awards.jsx';

import './organization.scss';

class Organization extends React.Component {

  static propTypes = {
    organization: object,
  };

  render() {
    const {organization} = this.props;
    if (!organization) {
      return (
        'No hay una organización cargada.'
      );
    }
    const {name, description, avatar_url} = organization;
    return (
      <Grid className="organization" container direction="column">
        <Grid container item xs>
          <Grid item xs={2}>
            <img id="org-avatar" src={avatar_url}/>
          </Grid>
          <Grid item xs={10}>
            <h2> {name} </h2>
            <p>
              {description}
            </p>
          </Grid>
        </Grid>
        <Grid item>
          <Awards />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.github.organization
});

export default connect(mapStateToProps)(Organization);
