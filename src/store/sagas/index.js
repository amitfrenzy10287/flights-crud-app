import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { initCheapAndBusinessFlights } from './flightBooking';

export function* watchFlightBooking() {
    yield takeLatest(actionTypes.GET_ALL_FLIGHTS, initCheapAndBusinessFlights);
}
