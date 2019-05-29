import React from 'react';
import {connect} from 'react-redux';
import PropTypes, {array} from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core';


const styles = theme => ({
  paper: {
    overflow: 'scroll',
  }
});

class CommitTimes extends React.Component {

  static propTypes = {
    commitTimes: array,
    classes: PropTypes.object.isRequired
  };

  render() {
    let {commitTimes, classes} = this.props;
    commitTimes = commitTimes.sort(([_, commits], [_a, otherCommits]) => otherCommits - commits);
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Hora
              </TableCell>
              <TableCell>
                Commits
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              commitTimes.map(([hour, commits]) => <TableRow key={hour}>
                <TableCell>
                  {hour}:00 - {hour}:59
                </TableCell>
                <TableCell>
                  {commits}
                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </Paper>);
  }
}

const mapStateToProps = (state) => ({
  commitTimes: Object.entries(state.github.awards.commitTimes)
});

export default connect(mapStateToProps)(withStyles(styles)(CommitTimes));
