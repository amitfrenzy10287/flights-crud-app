import { put } from "redux-saga/effects";
import axios from "../../axios-flights";
import * as actions from "../actions";

export function* initCheapAndBusinessFlights() {
    try {
        const respCheapFlights= yield axios.get( 'api/flights/cheap');
        const respBusinessFlights = yield axios.get( 'api/flights/business');
        const sortedFlights = [];
        respCheapFlights.data.data.map((arr)=>{
            let route = arr.route.split("-");
            sortedFlights.push({
                "departure": route[0],
                "arrival": route[1],
                "departureTime": arr.departure,
                "arrivalTime": arr.arrival,
                "type": "cheap"
            });
        });
        const fetchedFlights = sortedFlights.concat(respBusinessFlights.data.data);
        yield put(actions.setFlights(fetchedFlights));
    } catch (error) {
        yield put(actions.fetchFlightsFailed());
    }
};
