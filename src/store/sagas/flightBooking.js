import { put } from "redux-saga/effects";
import axios from "../../axios-flights";
import * as actions from "../actions";

export function* initCheapAndBusinessFlights() {
    try {
        const respCheapFlights= yield axios.get( 'api/flights/cheap');
        const respBusinessFlights = yield axios.get( 'api/flights/business');
        const respCommonFlights = yield axios.get( 'http://localhost:9000/common_data');
        const sortedFlights = [];
        const commonFlightsData = respCommonFlights.data;
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
        const allData = commonFlightsData.concat(fetchedFlights);
        yield put(actions.setFlights(allData));
    } catch (error) {
        yield put(actions.fetchFlightsFailed());
    }
};
export function* addFlights(action) {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    const data = JSON.stringify(action.data);
    try {
        const resp = yield axios.post('http://localhost:9000/common_data',data,config);
        yield put(actions.addFlightsSuccess(resp));
    } catch (error) {
        yield put(actions.addFlightsFailed());
    }
};
