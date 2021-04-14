import React, { useState, useEffect } from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
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

const CellBankAcc = styled.div`
  width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const CellBankBalance = styled.div`
  width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  text-align: center;
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
          Bank Summary
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
            <Link href="/bank/summary-add">
              <Button size="Small" status="Warning" style={{ display: 'flex' }}>
                <div style={{ alignSelf: 'center', marginRight: '2px' }}>Add</div>
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

const BankSummaryList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const bankSummaryParam = {
      // Page: 1,
      // Size: 20,
      Status: null,
    };
    axios
      .post('http://localhost:5000/api/Admin/Bank/GetSummary/', bankSummaryParam)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const dataList = data.banks;
        setDataList(dataList);
      })
      .catch(() => {
        console.log('Error retrieving data.');
      });
  }, []);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('index');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const formatterIDR = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <Layout title="Bank Summary List">
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
                      <Card>
                        <CardHeader>LEVEL 1 {dataList?.map((data: any) => data?.level)}</CardHeader>
                        <CardBody>
                          <Row>
                            {dataList?.map((data: any) => (
                              <Col breakPoint={{ xs: 12, md: 3 }} style={{ width: '100%', margin: '20px' }}>
                                <StyledTableRow hover style={{ width: '100%' }}>
                                  <StyledTableCell width="33%">
                                    <b>{data?.bankName}</b>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <b>Level 1 {data?.level}</b>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <b>{data?.status}</b>
                                  </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow hover style={{ width: '100%' }}>
                                  <StyledTableCell colSpan="3">
                                    <Tooltip placement="bottom-start" title={data?.bankAccountName}>
                                      <CellBankAcc>{data?.bankAccountName}</CellBankAcc>
                                    </Tooltip>
                                  </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow hover style={{ width: '100%' }}>
                                  <StyledTableCell colSpan="3">{data?.bankNumber}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow hover style={{ width: '100%' }}>
                                  <StyledTableCell>
                                    <Link href="/transaction/adjustment">Credit</Link>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Link href="/transaction/adjustment">Debit</Link>
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Link href="/transaction/adjustment">Transfer</Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow hover style={{ width: '100%' }}>
                                  <StyledTableCell colSpan="3">
                                    <Link href="/transaction/enquiry">
                                      <Tooltip title={formatterIDR.format(data?.balance)}>
                                        <CellBankBalance>
                                          Balance - {formatterIDR.format(data?.balance)}
                                        </CellBankBalance>
                                      </Tooltip>
                                    </Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                              </Col>
                            ))}
                          </Row>
                        </CardBody>
                      </Card>
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

export default BankSummaryList;
