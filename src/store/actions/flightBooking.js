import * as actionTypes from './actionTypes';

export const getAllFlights = () => {
    return {
        type: actionTypes.GET_ALL_FLIGHTS,
    };
};
export const addFlightsSuccess = (resp) => {
    return {
        type: actionTypes.ADD_FLIGHTS_SUCCESS,
        addFlight:resp
    };
};
export const addFlightsFailed = () => {
    return {
        type: actionTypes.ADD_FLIGHTS_FAILED,
    };
};
export const addFlights = (data) => {
    return {
        type: actionTypes.ADD_FLIGHTS,
        data
    };
};
export const setFlights = (flights) => {
    return {
        type: actionTypes.SET_ALL_FLIGHTS,
        allFlights:flights
    };
};

export const fetchFlightsFailed = () => {
    return {
        type: actionTypes.FETCH_FLIGHTS_FAILED,
    };
};
