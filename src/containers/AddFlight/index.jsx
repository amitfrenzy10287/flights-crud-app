import React,{useState,useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    containerWrap: {
        padding: theme.spacing(2),
        minHeight: 500,
        height: 500
    }
}));

const AddFlight=(props)=> {
    const classes = useStyles();
    const [flightdata, setFlightdata] = useState({
       arrival:'',
       departure:'',
       arrivalTime:'',
       departureTime:'',
       class:''
    });
    const onInputChange = useCallback((e, type)=>{
        const data = {};
        data[type] = e.target.value;
        setFlightdata(prevState => ({
            ...prevState,
            ...data
        }));
    },[]);

    const saveFlights=useCallback(()=>{
        console.log(flightdata);
    },[flightdata]);

    return (
        <Grid lg={9} xl={9} justify="center">
            <Paper className={classes.containerWrap}>
                <form>
                    <FormControl>
                        <InputLabel htmlFor="component-arr">Arrival</InputLabel>
                        <Input type="text" onChange={(e)=>onInputChange(e,'arrival')}
                               value={flightdata.arrival}
                               id="component-arr" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="component-dep">Departure</InputLabel>
                        <Input type="text" onChange={(e)=>onInputChange(e,'departure')}
                               value={flightdata.departure}
                               id="component-dep" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="component-arr-time">Arrival time</InputLabel>
                        <Input type="text" onChange={(e)=>onInputChange(e,'arrivalTime')}
                               value={flightdata.arrivalTime}
                               id="component-arr-time" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="component-dep-time">Departure Time</InputLabel>
                        <Input type="text" onChange={(e)=>onInputChange(e,'departureTime')}
                               value={flightdata.departureTime}
                               id="component-dep-time" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="component-class">Class</InputLabel>
                        <Input type="text" id="component-class"
                               value={flightdata.class}
                               onChange={(e)=>onInputChange(e,'class')} name="class" />
                    </FormControl>
                </form>
                <Grid container justify="left" item>
                    <Box m={2}>
                        <Button onClick={saveFlights} variant="contained" color="primary">
                            Save & Continue
                        </Button>
                    </Box>
                    <Box m={2}>
                        <Button variant="contained" >
                            Back
                        </Button>
                    </Box>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default AddFlight;