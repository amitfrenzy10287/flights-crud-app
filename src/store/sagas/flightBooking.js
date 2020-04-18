import { put } from "redux-saga/effects";
import axios from "../../axios-flights";
import * as actions from "../actions";

export function* initMoviesAvailableSaga(action) {
    try {
        const responseMovies = yield axios.get( 'api/flights/cheap');
        const respBusinessFlights = yield axios.get( 'api/flights/business');
        const fetchedMovie = [];
        for (let key in responseMovies.data) {
            fetchedMovie.push({
                ...responseMovies.data[key]
            });
        }
        //yield put(actions.setMovies(fetchedMovie));
    } catch (error) {
        //yield put(actions.fetchMoviesFailed());
    }
}
export function* initSeatsAvailableSaga(action) {
    try {
        const responseSeats = yield axios.get(
            "https://bookmymovies-db.firebaseio.com/seat_details.json"
        );
        const fetchedMovieSeats = [];
        for (let key in responseSeats.data) {
            fetchedMovieSeats.push({
                ...responseSeats.data[key]
            });
        }
        //yield put(actions.setSeats(fetchedMovieSeats));
    } catch (error) {
        //yield put(actions.fetchMoviesFailed());
    }
}
