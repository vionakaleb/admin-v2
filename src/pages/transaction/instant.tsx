import React from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody } from '@paljs/ui/Card';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const rows = [
  {
    transactionId: 1,
    transactionDate: '2021-03-24 11:18:35',
    transactionSerial: 'A0020',
    transactionMember: 'John Doe',
    transactionName: 'John Doe',
    transactionTags: '',
    transactionMethod: 'Deposit',
    transactionStatus: 'Processing',
    transactionCredit: 111,
    transactionDebit: '',
    transactionBalance: 100000,
    transactionProcessing: 'mycashadmin',
    transactionAction: 'activated',
  },
  {
    transactionId: 2,
    transactionDate: '2021-03-25 13:18:35',
    transactionSerial: 'A0021',
    transactionMember: 'Andy Doe',
    transactionName: 'Andy Doe',
    transactionTags: '',
    transactionMethod: 'Withdrawal',
    transactionStatus: 'Pending',
    transactionCredit: '',
    transactionDebit: 100,
    transactionBalance: 200000,
    transactionProcessing: '',
    transactionAction: 'activated',
  },
  {
    transactionId: 3,
    transactionDate: '2021-03-26 17:18:35',
    transactionSerial: 'A0022',
    transactionMember: 'Jenn Doe',
    transactionName: 'Chris Doe',
    transactionTags: '',
    transactionMethod: 'Deposit',
    transactionStatus: 'Processing',
    transactionCredit: 113,
    transactionDebit: '',
    transactionBalance: 50000,
    transactionProcessing: 'mycashadmin',
    transactionAction: 'activated',
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'transactionId', numeric: true, disablePadding: true, label: '#' },
  { id: 'transactionDate', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'transactionSerial', numeric: false, disablePadding: false, label: 'Serial' },
  { id: 'transactionMember', numeric: false, disablePadding: false, label: 'Member' },
  { id: 'transactionName', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'transactionTags', numeric: false, disablePadding: false, label: 'Tags' },
  { id: 'transactionMethod', numeric: false, disablePadding: false, label: 'Method' },
  { id: 'transactionStatus', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'transactionCredit', numeric: false, disablePadding: false, label: 'Credit' },
  { id: 'transactionDebit', numeric: false, disablePadding: false, label: 'Debit' },
  { id: 'transactionBalance', numeric: false, disablePadding: false, label: 'Balance' },
  { id: 'transactionProcessing', numeric: false, disablePadding: false, label: 'Processing' },
  { id: 'transactionAction', numeric: false, disablePadding: false, label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>{order === 'desc' ? '' : ''}</span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Instant Transaction
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function Instant() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('transactionId');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.transactionId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, transactionId) => {
    const selectedIndex = selected.indexOf(transactionId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, transactionId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (transactionId) => selected.indexOf(transactionId) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Layout title="Instant Transaction">
      <Row center="xs">
        <Col breakPoint={{ xs: 12 }}>
          <Card>
            <CardBody>
              <div className={classes.root}>
                <Paper className={classes.paper}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      size={'small'}
                      aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.transactionId);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <StyledTableRow
                                hover
                                onClick={(event) => handleClick(event, row.transactionId)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.transactionId}
                                selected={isItemSelected}
                              >
                                <StyledTableCell padding="checkbox">
                                  <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                                </StyledTableCell>
                                <StyledTableCell align="left" padding="none">
                                  {row.transactionId}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.transactionDate}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionSerial}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionMember}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionName}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionTags}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionMethod}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionStatus}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionCredit}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionDebit}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionBalance}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionProcessing}</StyledTableCell>
                                <StyledTableCell align="left">{row.transactionAction}</StyledTableCell>
                                {/* <StyledTableCell component="th" id={labelId} scope="row" padding="none">
                                  {row.transactionDate}
                                </StyledTableCell> */}
                              </StyledTableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 33 * emptyRows }}>
                            <StyledTableCell colSpan={12} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
