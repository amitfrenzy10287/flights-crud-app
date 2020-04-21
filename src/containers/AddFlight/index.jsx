import React,{useState,useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import axios from "../../axios-flights";
import Alert from '@material-ui/lab/Alert';
import AlertTitle  from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    containerWrap: {
        padding: theme.spacing(2),
        minHeight: 500,
        height: 500
    },
    typeContainer: {
        flexDirection:'row',
        padding: theme.spacing(2),
    }
}));

const AddFlight=(props)=> {
    const classes = useStyles();
    const [flightdata, setFlightdata] = useState({
       arrival: '',
       departure: '',
       arrivalTime: '07:30',
       departureTime: '15:30',
       class: 'business'
    });
    const [open, setOpen] = useState(true);
    const [isValidate, setValidate] = useState(true);
    const onInputChange = useCallback((e, type)=>{
        const data = {};
        data[type] = e.target.value;
        setFlightdata(prevState => ({
            ...prevState,
            ...data
        }));
    },[flightdata]);

    const saveFlights=useCallback(()=>{
        setFlightdata({
            arrival:'',
            departure:'',
            arrivalTime:'',
            departureTime:'',
            class:''
        });
        if(
            flightdata.arrival ===''
            || flightdata.departure ===''
            || flightdata.arrivalTime ===''
            || flightdata.departureTime ===''
            || flightdata.class ===''){
            setValidate(false);
        }else{
            setValidate(true);
            props.addFlights(flightdata);
        }

    },[flightdata]);
    const handleBack =()=>{
      props.history.push('/');
    };
    const handleTypeChange=useCallback(()=>{

    },[]);
    const { flightsRes } = props;
    return (
        <Grid lg={6} xl={6} mg={6} item justify="center">
            <Grid>
                { flightsRes && flightsRes ==='Created' && open === true &&
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Flight added successfully!
                </Alert> }
            </Grid>
            <Paper className={classes.containerWrap}>
                {!isValidate && <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    All field required — <strong>Please fill all the detail's to continue!</strong>
                </Alert>}
                <Box p={2}>
                    <Typography variant="h5" color="primary" component="h5">
                         Add Flights
                    </Typography>
                </Box>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                            label="Arrival" type="text"
                            onChange={(e)=>onInputChange(e,'arrival')}
                            value={flightdata.arrival}
                            variant="filled"
                        />
                        <TextField
                            label="Departure" type="text"
                            onChange={(e)=>onInputChange(e,'departure')}
                            value={flightdata.departure}
                            variant="filled"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Arrival Time"
                            onChange={(e)=>onInputChange(e,'arrivalTime')}
                            value={flightdata.arrivalTime}
                            variant="filled"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                        <TextField
                            label="Departure Time"
                            onChange={(e)=>onInputChange(e,'departureTime')}
                            value={flightdata.departureTime}
                            variant="filled"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </div>
                    <div>
                        <RadioGroup className={classes.typeContainer}
                            aria-label="type" name="type" value={flightdata.class}
                            onChange={(e)=>onInputChange(e,'class')}>
                            <FormControlLabel value="business" control={<Radio />} label="Business Class" />
                            <FormControlLabel value="cheap" control={<Radio />} label="Economy Class" />
                        </RadioGroup>
                    </div>
                </form>
                <Grid container justify="left" item>
                    <Box m={2}>
                        <Button onClick={saveFlights} variant="contained" color="primary">
                            Save & Continue
                        </Button>
                    </Box>
                    <Box m={2}>
                        <Button onClick={handleBack} variant="contained" >
                            Back
                        </Button>
                    </Box>
                </Grid>
            </Paper>
        </Grid>
    );
};
const mapStateToProps = state => {
    return {
        flightsRes: state.flights && state.flights.addFlight ? state.flights.addFlight : ''
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addFlights: (data) => dispatch(actions.addFlights(data)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)( AddFlight, axios );