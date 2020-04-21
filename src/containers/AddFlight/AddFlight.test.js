import React from 'react';
import AddFlight from './index';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

configure({adapter: new Adapter()});
const mockStore = configureMockStore();
const store = mockStore({});

describe("To test the title exist", () => {
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

describe('<AddFlight /> with no props', () => {
    const state = {
        addFlight:''
    };
    const container = shallow(
        <Provider store={store}>
            <AddFlight />
        </Provider>
    );
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have a btn component', ()=> {
        //There should be only one button
        expect(container.find('Button'));
    });

});