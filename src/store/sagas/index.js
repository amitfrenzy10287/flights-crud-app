import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { initMoviesAvailableSaga,initSeatsAvailableSaga } from './flightBooking';

export function* watchFlightBooking() {
    yield takeEvery(actionTypes.INIT_MOVIES, initMoviesAvailableSaga);
    yield takeEvery(actionTypes.INIT_MOVIES, initSeatsAvailableSaga);
}
