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

const styles = theme => ({
  paper: {
    overflow: 'scroll',
  }
});

class TopCommitter extends React.Component {

  static propTypes = {
    commitAuthors: array,
    classes: PropTypes.object.isRequired
  };

  render() {
    let {commitAuthors, classes} = this.props;
    commitAuthors = commitAuthors.sort((author, other) => other.commits - author.commits);
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Usuario
              </TableCell>
              <TableCell>
                Commits
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              commitAuthors.map(author => <TableRow key={author.info.login}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box mr={2}>
                      <img className="avatar-img" src={author.info.avatar_url}/>
                    </Box>
                    <div>
                      @{author.info.login}
                    </div>
                  </Box>
                </TableCell>
                <TableCell>
                  {author.commits}
                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </Paper>);
  }
}

const mapStateToProps = (state) => ({
  commitAuthors: Object.values(state.github.awards.commitAuthors)
});

export default connect(mapStateToProps)(withStyles(styles)(TopCommitter));
