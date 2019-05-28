import React from 'react';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import {array} from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class TopCommitter extends React.Component {

  static propTypes = {
    commitAuthors: array
  };

  render() {
    let {commitAuthors} = this.props;
    commitAuthors = commitAuthors.sort((author, other) => other.commits - author.commits);
    return (
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
      </Table>);
  }
}

const mapStateToProps = (state) => ({
  commitAuthors: Object.values(state.github.awards.commitAuthors)
});

export default connect(mapStateToProps)(TopCommitter);
