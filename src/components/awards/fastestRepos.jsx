import React from 'react';
import {connect} from 'react-redux';
import Box from '@material-ui/core/Box';
import {array} from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

class FastestRepos extends React.Component {

  static propTypes = {
    repoTimes: array
  };

  render() {
    let {repoTimes} = this.props;
    repoTimes = repoTimes.sort((repo, other) => repo.duration - other.duration);
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Usuario
            </TableCell>
            <TableCell>
              Primer commit
            </TableCell>
            <TableCell>
              Último commit
            </TableCell>
            <TableCell>
              Tiempo entre commits
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
                {moment(repo.firstDate).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>
                {moment(repo.lastDate).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>
                {moment.duration(repo.duration, 'seconds').format('y[y] M[m] d[d] h[h] m[m] s[s]', {
                  trim: 'both'
                })}
              </TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>);
  }
}

const mapStateToProps = (state) => ({
  repoTimes: Object.values(state.github.awards.repoTimes)
});

export default connect(mapStateToProps)(FastestRepos);
