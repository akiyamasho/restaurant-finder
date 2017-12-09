import React from "react";
import {Provider} from "react-redux";
import {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} from "react-dom/test-utils";
import {expect} from "chai";
import {RestaurantListContainer} from "../../src/components/RestaurantList";
import {createTestStore, SAMPLE_RESTAURANTS, store} from "../test_data";
import {Map} from "immutable";
import {SET_STATE} from "../../src/actions";

describe(`Restaurant List`, () => {
    it(`renders an error message and a button if the list is null`, () => {
        const store = createTestStore();
        const state = Map({ restaurantList: null });
        store.dispatch({
            type: SET_STATE,
            state: state
        });

        const component = renderIntoDocument(
            <Provider store={store}>
                <RestaurantListContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithClass(component, `empty-list-message`);
        expect(inputs[0]).to.be.ok;
    });

    it(`renders an error message and a button if the list is empty`, () => {
        const store = createTestStore();
        const state = Map({ restaurantList: [] });
        store.dispatch({
            type: SET_STATE,
            state: state
        });

        const component = renderIntoDocument(
            <Provider store={store}>
                <RestaurantListContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithClass(component, `empty-list-message`);
        expect(inputs[0]).to.be.ok;
    });

    it(`renders a list if there are elements in the list`, () => {
        const store = createTestStore();
        const state = Map({ restaurantList: SAMPLE_RESTAURANTS });
        store.dispatch({
            type: SET_STATE,
            state: state
        });

        const component = renderIntoDocument(
            <Provider store={store}>
                <RestaurantListContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithClass(component, `restaurant-entry`);
        expect(inputs.length).to.equal(SAMPLE_RESTAURANTS.length);
    });

    it(`clears the restaurant list from store on click of button for searching again`, () => {
        const store = createTestStore();
        const state = Map({ restaurantList: SAMPLE_RESTAURANTS });
        store.dispatch({
            type: SET_STATE,
            state: state
        });

        const component = renderIntoDocument(
            <Provider store={store}>
                <RestaurantListContainer />
            </Provider>
        );

        const resetBtns = scryRenderedDOMComponentsWithClass(component, `btn-reset`);
        expect(resetBtns[0]).to.be.ok;
        Simulate.click(resetBtns[0]);

        expect(store.getState().main.get(`restaurantDetails`)).to.be.undefined;
    });
});
