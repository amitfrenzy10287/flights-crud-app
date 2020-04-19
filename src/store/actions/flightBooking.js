import * as actionTypes from './actionTypes';

export const getAllFlights = () => {
    return {
        type: actionTypes.GET_ALL_FLIGHTS,
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
