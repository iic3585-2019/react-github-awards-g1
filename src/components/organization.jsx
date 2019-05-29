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
          <div className="info">
            <img id="org-avatar" src={avatar_url}/>
            <div className="description">
              <h2> {name} </h2>
              <p>
                {description}
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs>
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
