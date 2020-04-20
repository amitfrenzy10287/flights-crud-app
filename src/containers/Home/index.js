import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-flights';
import * as actions from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

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
    { id: 'departure', numeric: true, disablePadding: false, label: 'Departure' },
    { id: 'arrival', numeric: true, disablePadding: false, label: 'Arrival' },
    { id: 'departureTime', numeric: true, disablePadding: false, label: 'Departure Time' },
    { id: 'arrivalTime', numeric: true, disablePadding: false, label: 'Arrival Time' },
    { id: 'class', numeric: true, disablePadding: false, label: 'Class' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead className={classes.tableHeadContainer}>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell className={classes.tableHead}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
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
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    tableHeadContainer:{
        backgroundColor: '#3f51b5',
        color:'#FFFFFF'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableHead:{
      color: '#FFFFFF',
      '& :hover':{
          color:'#FFFFFF'
      },
      '& :focus':{
         color:'#FFFFFF'
      },
      '& .MuiTableSortLabel-root.MuiTableSortLabel-active':{
        color: '#FFFFFF',
      },
      '& .MuiTableSortLabel-icon-active':{
          color: '#FFF'
      }
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
    loader:{
        width:'100%',
        height: 50
    },
    rootSearch: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        marginRight:theme.spacing(2)
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    searchWrap: {
        padding: theme.spacing(2)
    }

}));

const Home=(props)=>{
    const classes = useStyles();
    const {flights,loading,error} = props;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [result, setResult] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(()=>{
        props.getAllFlights();
    },[]);

    const reformatDateTime = React.useCallback(((flightDate)=>{
        if(!flightDate) return false;
        if((typeof flightDate)==="string") return flightDate;
        let unix_timestamp = flightDate;
        let date = new Date(unix_timestamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        return  hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }),[]);

    const finalTableData = React.useMemo(()=>{
        const count = Object.keys(flights).length;
        if(count===0 || error ===true) return [];
        return flights;
    },[flights,loading,error,page]);

    const searchData = React.useCallback((e)=>
    {
        const filteredResult =
            finalTableData
            .filter(s => {
                let arrival = s.arrival.toLowerCase();
                let departure = s.departure.toLowerCase();
                let arrTime =reformatDateTime(s.departureTime);
                let depTime = reformatDateTime(s.arrivalTime);
                let val = e.target.value.toLowerCase();
                return arrival.includes(val) || departure.includes(val);
            });
        setResult(prevState=>({
            ...prevState,
            ...filteredResult
        }));
    },[finalTableData]);
    const tableData = Object.keys(result).length > 0 ? Object.keys(result).map((k) => result[k]) : finalTableData;
    const addFlight=React.useCallback(()=>{
        props.history.push('/addflight');
    },[]);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid className={classes.searchWrap} container item justify="right">
                <Paper className={classes.rootSearch}>
                    <IconButton className={classes.iconButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e=>searchData(e)}
                    />
                    <IconButton className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Button variant="contained" onClick={addFlight} color="primary">
                    <AddIcon /> Add Flight
                </Button>
                </Grid>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={tableData.length}
                        />
                        <TableBody>
                            {tableData.length > 0 ? stableSort(tableData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={index}
                                        >
                                            <TableCell align="right">{row.departure}</TableCell>
                                            <TableCell align="right">{row.arrival}</TableCell>
                                            <TableCell align="right">{reformatDateTime(row.departureTime)}</TableCell>
                                            <TableCell align="right">{reformatDateTime(row.arrivalTime)}</TableCell>
                                            <TableCell align="right">
                                                {row.type && row.type==="cheap"? 'Economy Class': 'Business Class'}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }):(loading===true ?
                                    <TableCell colSpan={5}>
                                        <Skeleton className={classes.loader} animation="wave" />
                                        <Skeleton className={classes.loader} animation="wave" />
                                        <Skeleton className={classes.loader} animation="wave" />
                                        <Skeleton className={classes.loader} animation="wave" />
                                        <Skeleton className={classes.loader} animation="wave" />
                                    </TableCell>
                                :<TableCell colSpan={6}>
                                  No Records found!
                                </TableCell>)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        flights: state.flights.allFlights,
        error: state.flights.error,
        loading: state.flights.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllFlights: () => dispatch(actions.getAllFlights()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)( Home, axios );