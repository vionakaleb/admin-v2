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
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@paljs/ui/Button';
import { EvaIcon } from '@paljs/ui/Icon';
import styled from 'styled-components';

const InputSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5.6px 0;
`;

const InputSelect = styled.select`
  border-style: solid;
  border-width: 1px;
  width: 100%;
  background-color: #f7f9fc;
  border-color: #e4e9f2;
  color: #222b45;
  border-radius: 0.25rem;
  line-height: 1.5rem;
  padding: 10px;
`;

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
  { id: 'index', numeric: true, disablePadding: true, label: '#' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'fullName', numeric: false, disablePadding: false, label: 'Full Name' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'adminDepartment', numeric: false, disablePadding: false, label: 'Department' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'adminDate', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'adminAction', numeric: false, disablePadding: false, label: 'Actions' },
];

function EnhancedTableHead(props: any) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'default'}
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
          Admin List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Row
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              marginRight: '10px',
              position: 'absolute',
              right: 0,
            }}
          >
            <Link href="/admins/account-add">
              <Button size="Small" status="Warning" style={{ display: 'flex' }}>
                <div style={{ alignSelf: 'center', marginRight: '2px' }}>New Admin</div>
                <EvaIcon name="plus-square" />
              </Button>
            </Link>
          </Row>
          {/* <Tooltip
            title="Filter list"
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              marginRight: '10px',
              position: 'absolute',
              right: '60px',
            }}
          >
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip> */}
        </>
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

const AdminList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const adminParam = {
      // Page: 1,
      // Size: 20,
      Sort: null,
      KeyWord: null,
      Status: status,
    };
    axios
      .post('http://localhost:5000/api/Admin/Admin/GetUserList', adminParam)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const dataList = data.userAdmins;
        setDataList(dataList);
      })
      .catch(() => {
        console.log('Error retrieving data.');
      });
  }, []);

  const apiAddAdmin = async (status: any) => {
    const adminParam = {
      Status: status,
    };
    await axios.post('http://localhost:5000/api/Admin/Admin/GetUserList', adminParam);
  };

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('index');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [status, setStatus] = useState('');

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = dataList.map((n, index) => index);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, index: any) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
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

  const isSelected = (index: any) => selected.indexOf(index) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataList.length - page * rowsPerPage);

  return (
    <Layout title="Admin List">
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
                            const isItemSelected = isSelected(index);
                            // const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <StyledTableRow
                                hover
                                // onClick={(event) => handleClick(event, index)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                selected={isItemSelected}
                              >
                                {/* <StyledTableCell padding="checkbox">
                                  <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                                </StyledTableCell> */}
                                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                <StyledTableCell align="left">{data?.name ? data?.name : ' - '}</StyledTableCell>
                                <StyledTableCell align="left">
                                  {data?.fullName ? data?.fullName : ' - '}
                                </StyledTableCell>
                                <StyledTableCell align="left">{data?.role ? data?.role : ' - '}</StyledTableCell>
                                <StyledTableCell align="left">
                                  {data?.adminDepartment ? data?.adminDepartment : ' - '}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  <InputSelectWrapper>
                                    <InputSelect onChange={({ target }) => apiAddAdmin(target.value)}>
                                      <option value="" selected disabled hidden>
                                        {data?.status ? data?.status : ' - '}
                                      </option>
                                      <option value={'Activated'}>Activated</option>
                                      <option value={'Inactive'}>Inactivated</option>
                                    </InputSelect>
                                  </InputSelectWrapper>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Updated at: {data?.adminDate ? data?.adminDate : ' - '}
                                </StyledTableCell>
                                <StyledTableCell align="left" key={data?.id}>
                                  <Link href={`/admins/edit/${encodeURIComponent(data?.id)}`}>
                                    <Tooltip title="Edit">
                                      <Button
                                        size="Tiny"
                                        style={{ backgroundColor: 'inherit', border: 'none', padding: 0 }}
                                      >
                                        <EvaIcon name="edit" options={{ fill: '#1565C0' }} />
                                      </Button>
                                    </Tooltip>
                                  </Link>
                                  <Link href={`/admins/reset-password/${encodeURIComponent(data?.id)}`}>
                                    <Tooltip title="Reset Password">
                                      <Button
                                        size="Tiny"
                                        style={{ backgroundColor: 'inherit', border: 'none', padding: '0 5px' }}
                                      >
                                        <EvaIcon name="lock" options={{ fill: '#43A047' }} />
                                      </Button>
                                    </Tooltip>
                                  </Link>
                                </StyledTableCell>
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

export default AdminList;
