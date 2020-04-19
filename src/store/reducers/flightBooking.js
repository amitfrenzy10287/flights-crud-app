import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allFlights:{},
    loading: false,
    error: false
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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_ALL_FLIGHTS: return initFlights( state, action );
        case actionTypes.SET_ALL_FLIGHTS: return setFlights( state, action );
        case actionTypes.FETCH_FLIGHTS_FAILED: return getFlightsFailed( state, action );
        default: return state;
    }
};

export default reducer;