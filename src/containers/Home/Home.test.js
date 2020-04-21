import React from 'react';
import Home from './index';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();
const store = mockStore({});

describe("To test the title exist", () => {
    it("should render without throwing an error", () => {
        expect(
            shallow(
                <Provider store={store}>
                    <Home />
                </Provider>
            ).exists(
                <IconButton aria-label="search">
                    <SearchIcon />
                </IconButton>
            )
        );
    });
});

describe('<Home /> with no props', () => {
    const state = {
        flights:{
            allFlights: {}
        }
    };
    const container = shallow(
        <Provider store={store}>
            <Home state={state} />
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