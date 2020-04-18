import * as actionTypes from './actionTypes';

export const initWatchMovie = ( watchmovie ) => {
    return {
        type: actionTypes.INIT_WATCH_MOVIE,
        watchmovie: watchmovie
    };
};

export const addSeats = ( seats ) => {
    return {
        type: actionTypes.ADD_SEATS,
        seats: seats
    };
};
