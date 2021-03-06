import React from 'react';
import AddFlight from './containers/AddFlight';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

configure({adapter: new Adapter()});
const mockStore = configureMockStore();
const store = mockStore({});

describe("Add Flight Component", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <AddFlight />
                </Provider>
            ).exists(<h5>Add Flights</h5>)
        );
    });
});