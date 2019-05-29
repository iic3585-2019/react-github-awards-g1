import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import {array} from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const styles = theme => ({
  paper: {
    overflow: 'scroll',
  }
});

class FastestRepos extends React.Component {

  static propTypes = {
    repoTimes: array,
    classes: PropTypes.object.isRequired
  };

  render() {
    let {repoTimes, classes} = this.props;
    repoTimes = repoTimes.sort((repo, other) => repo.duration - other.duration);
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>
                Repositorio
              </TableCell>
              <TableCell className={classes.head}>
                Tiempo entre commits
              </TableCell>
              <TableCell className={classes.head}>
                Primer commit
              </TableCell>
              <TableCell className={classes.head}>
                Último commit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              repoTimes.map((repo) => <TableRow key={repo.name}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <div>
                      {repo.name}
                    </div>
                  </Box>
                </TableCell>
                <TableCell>
                  {moment.duration(repo.duration, 'seconds').format('y[y] M[m] d[d] h[h] m[m] s[s]', {
                    trim: 'both'
                  })}
                </TableCell>
                <TableCell>
                  {moment(repo.firstDate).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  {moment(repo.lastDate).format('DD/MM/YYYY')}
                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </Paper>);
  }
}

const mapStateToProps = (state) => ({
  repoTimes: Object.values(state.github.awards.repoTimes)
});

export default connect(mapStateToProps)(withStyles(styles)(FastestRepos));
