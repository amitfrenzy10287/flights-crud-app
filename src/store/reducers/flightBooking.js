import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allFlights:{},
    loading: false,
    error: false,
    addFlight:''
};

const initFlights = (state, action) => {
    const data = { loading: true };
    return {...state, ...data};
};
const setFlights = (state, action) => {
    const data = { allFlights: action.allFlights, loading: false };
    return {...state, ...data};
};
const getFlightsFailed = (state, action) => {
    const data = { loading: false, error: true };
    return {...state, ...data};
};
const addFlightSuccess = (state, action) => {
    const data = { addFlight: action.addFlight && action.addFlight.statusText, loading: false, error: false };
    return {...state, ...data};
};
const addFlightsFailed = (state, action) => {
    const data = { loading: false, error: true };
    return {...state, ...data};
};
const addFlights = (state, action) => {
    const data = { loading: false, error: true };
    return {...state, ...data};
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_ALL_FLIGHTS: return initFlights( state, action );
        case actionTypes.ADD_FLIGHTS: return addFlights( state, action );
        case actionTypes.ADD_FLIGHTS_SUCCESS: return addFlightSuccess( state, action );
        case actionTypes.ADD_FLIGHTS_FAILED: return addFlightsFailed( state, action );
        case actionTypes.SET_ALL_FLIGHTS: return setFlights( state, action );
        case actionTypes.FETCH_FLIGHTS_FAILED: return getFlightsFailed( state, action );
        default: return state;
    }
};

export default reducer;