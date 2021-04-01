import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any, comparator: any) {
  const stabilizedThis = array.map((el: any, index: number) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
}

const headCells = [
  { id: 'enquiryId', numeric: true, disablePadding: true, label: '#' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'serial', numeric: false, disablePadding: false, label: 'Serial' },
  { id: 'member', numeric: false, disablePadding: false, label: 'Member' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'enquiryTags', numeric: false, disablePadding: false, label: 'Tags' },
  { id: 'method', numeric: false, disablePadding: false, label: 'Method' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'credit', numeric: false, disablePadding: false, label: 'Credit' },
  { id: 'debit', numeric: false, disablePadding: false, label: 'Debit' },
  { id: 'balance', numeric: false, disablePadding: false, label: 'Balance' },
  { id: 'processing', numeric: false, disablePadding: false, label: 'Processing' },
];

function EnhancedTableHead(props: any) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: any) => {
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

const EnhancedTableToolbar = (props: any) => {
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
          Transaction Enquiry
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

const TransactionEnquiry = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const enquiryParam = {
      Page: 1,
      Size: 20,
      Approval: [2, 3], // Approve = 2, Reject = 3
      Request: [1, 2], // Deposit = 1, Withdraw = 2
    };
    axios
      .post('http://localhost:5000/api/Admin/Transaction/GetTransactionList/', enquiryParam)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const dataList = data.transactions;
        setDataList(dataList);
      })
      .catch(() => {
        console.log('Error retrieving data.');
      });
  }, []);

  // console.log('enquiry dataList:', dataList);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('enquiryId');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = dataList.map((n) => n.enquiryId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, enquiryId: never) => {
    const selectedIndex = selected.indexOf(enquiryId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, enquiryId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (enquiryId: never) => selected.indexOf(enquiryId) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataList.length - page * rowsPerPage);

  return (
    <Layout title="Transaction Enquiry">
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
                        rowCount={dataList.length}
                      />
                      <TableBody>
                        {stableSort(dataList, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((data: any, index: number) => {
                            const isItemSelected = isSelected(data.enquiryId);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <StyledTableRow
                                hover
                                onClick={(event) => handleClick(event, data.enquiryId)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={data.enquiryId}
                                selected={isItemSelected}
                              >
                                <StyledTableCell padding="checkbox">
                                  <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                                </StyledTableCell>
                                <StyledTableCell align="left" padding="none">
                                  {data.enquiryId}
                                </StyledTableCell>
                                <StyledTableCell align="left">{data.date}</StyledTableCell>
                                <StyledTableCell align="left">{data.serial}</StyledTableCell>
                                <StyledTableCell align="left">{data.member}</StyledTableCell>
                                <StyledTableCell align="left">{data.name}</StyledTableCell>
                                <StyledTableCell align="left">{data.enquiryTags}</StyledTableCell>
                                <StyledTableCell align="left">{data.method}</StyledTableCell>
                                <StyledTableCell align="left">{data.status}</StyledTableCell>
                                <StyledTableCell align="left">{data.credit}</StyledTableCell>
                                <StyledTableCell align="left">{data.debit}</StyledTableCell>
                                <StyledTableCell align="left">{data.balance}</StyledTableCell>
                                <StyledTableCell align="left">{data.processing}</StyledTableCell>
                                {/* <StyledTableCell component="th" id={labelId} scope="data" padding="none">
                                  {data.enquiryDate}
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
                    count={dataList.length}
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
};

export default TransactionEnquiry;
